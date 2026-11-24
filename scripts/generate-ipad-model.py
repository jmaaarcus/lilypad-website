"""Original 11-inch landscape iPad Pro geometry, exported as glTF 2.0 binary.
Run with Python 3; standard library only.
"""
import json, math, struct
from pathlib import Path

blob = bytearray()
views, accessors, meshes, nodes, materials = [], [], [], [], []
def accessor(values, kind, fmt, component, target):
    while len(blob) % 4: blob.append(0)
    start = len(blob)
    flat = [v for row in values for v in row] if kind != 'SCALAR' else values
    blob.extend(struct.pack('<' + fmt * len(flat), *flat))
    views.append(dict(buffer=0, byteOffset=start, byteLength=len(blob)-start, target=target))
    a = dict(bufferView=len(views)-1, componentType=component, count=len(values), type=kind)
    if kind == 'VEC3' and target == 34962:
        a.update(min=[min(row[i] for row in values) for i in range(3)], max=[max(row[i] for row in values) for i in range(3)])
    accessors.append(a)
    return len(accessors)-1

def mat(name, rgb, metal=0, rough=.5):
    materials.append(dict(name=name,pbrMetallicRoughness=dict(baseColorFactor=[*rgb,1],metallicFactor=metal,roughnessFactor=rough)))
    return len(materials)-1
metal=mat('Silver aluminium',(.64,.67,.72),.83,.29)
back=mat('Satin aluminium',(.54,.57,.62),.72,.43)
glass=mat('Black cover glass',(.013,.016,.021),.12,.24)
display=mat('Display', (1,1,1),0,.8)
dark=mat('Machined recess',(.024,.029,.036),.15,.53)
lens=mat('Optical glass',(.025,.055,.10),.45,.16)
button=mat('Polished aluminium',(.72,.75,.79),.85,.24)

def outline(w,h,r,steps=12):
    return [(cx+r*math.cos(math.radians(a+i*90/steps)),cy+r*math.sin(math.radians(a+i*90/steps)))
            for cx,cy,a in [(w/2-r,h/2-r,0),(-w/2+r,h/2-r,90),(-w/2+r,-h/2+r,180),(w/2-r,-h/2+r,270)] for i in range(steps+1)]

def mesh(name, verts, inds, material, uv=None, normals=None):
    attrs={'POSITION':accessor(verts,'VEC3','f',5126,34962)}
    if normals is None:
        acc=[[0.,0.,0.] for _ in verts]
        for i in range(0,len(inds),3):
            a,b,c=inds[i:i+3]; u=[verts[b][j]-verts[a][j] for j in range(3)];v=[verts[c][j]-verts[a][j] for j in range(3)]
            n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
            for k in (a,b,c):
                for j in range(3): acc[k][j]+=n[j]
        normals=[tuple(v/max(math.sqrt(sum(x*x for x in n)),1e-12) for v in n) for n in acc]
    attrs['NORMAL']=accessor(normals,'VEC3','f',5126,34962)
    if uv is not None: attrs['TEXCOORD_0']=accessor(uv,'VEC2','f',5126,34962)
    p=dict(attributes=attrs,indices=accessor(inds,'SCALAR','H',5123,34963),material=material)
    meshes.append(dict(name=name,primitives=[p])); nodes.append(dict(name=name,mesh=len(meshes)-1))

def slab(name,w,h,r,z0,z1,bevel,material,capmaterial=None,offset=(0,0,0),uv=False):
    # Beveled rings and separate planar caps; no CSS surfaces.
    ox,oy,oz=offset
    rings=[(w-2*bevel,h-2*bevel,max(.001,r-bevel),z0), (w,h,r,z0+bevel), (w,h,r,z1-bevel),(w-2*bevel,h-2*bevel,max(.001,r-bevel),z1)] if bevel else [(w,h,r,z0),(w,h,r,z1)]
    verts=[(x+ox,y+oy,z+oz) for rw,rh,rr,z in rings for x,y in outline(rw,rh,rr)]
    n=len(verts)//len(rings); ids=[]
    # Vertex normals are averaged over adjoining triangle faces by the renderer if omitted.
    for j in range(len(rings)-1):
        for i in range(n):
            a=j*n+i;b=j*n+(i+1)%n;c=b+n;d=a+n
            ids += [a,b,c,a,c,d]
    mesh(name,verts,ids,material)
    for top in (False,True):
        rw,rh,rr,z=rings[-1 if top else 0]
        pts=outline(rw,rh,rr); vs=[(x+ox,y+oy,z+oz) for x,y in pts]+[(ox,oy,z+oz)]
        inds=[]
        for i in range(len(pts)):
            tri=[len(pts),i,(i+1)%len(pts)]
            inds += tri if top else tri[::-1]
        tex=[(x/rw+.5,.5-y/rh) for x,y in pts]+[(.5,.5)] if uv else None
        mesh(name+('Front' if top else 'Rear'),vs,inds,capmaterial if capmaterial is not None else material,tex,[(0,0,1 if top else -1)]*len(vs))

def disk(name,x,y,z,r,material,backwards=False):
    pts=[(x+r*math.cos(i*math.tau/32),y+r*math.sin(i*math.tau/32),z) for i in range(32)]+[(x,y,z)]
    idx=[]
    for i in range(32):
        t=[32,i,(i+1)%32];idx+=t[::-1] if backwards else t
    mesh(name,pts,idx,material,normals=[(0,0,-1 if backwards else 1)]*33)

def box(name,x,y,z,w,h,d,material):
    # small hardware features, oriented to the case edge
    vertices=[];indices=[];normals=[]
    for axis in range(3):
        for s in (-1,1):
            u=(axis+1)%3;v=(axis+2)%3;dims=[w,h,d];center=[x,y,z];base=len(vertices)
            for a,b in [(-1,-1),(1,-1),(1,1),(-1,1)]:
                q=center.copy();q[axis]+=s*dims[axis]/2;q[u]+=a*dims[u]/2;q[v]+=b*dims[v]/2;vertices.append(q);normal=[0,0,0];normal[axis]=s;normals.append(normal)
            indices += [base+i for i in ([0,1,2,0,2,3] if s==1 else [0,2,1,0,3,2])]
    mesh(name,vertices,indices,material,normals=normals)

# 11-inch iPad Pro dimensions in 100 mm units: 249.7 × 177.5 × 5.3 mm.
W,H,D=2.497,1.775,.053
slab('Chassis',W,H,.115,-D/2,D/2,.009,metal,back)
slab('CoverGlass',W-.026,H-.026,.104,.029,.036,.002,glass)
# 11-inch display dimensions are 2420 × 1668 px. Keep a narrow, even bezel.
sw=W-.156;sh=sw*1668/2420
pts=outline(sw,sh,.071)
verts=[(x,y,.037) for x,y in pts]+[(0,0,.037)]
indices=[v for i in range(len(pts)) for v in [len(pts),i,(i+1)%len(pts)]]
mesh('Display',verts,indices,display,[(x/sw+.5,.5-y/sh) for x,y in pts]+[(.5,.5)],[(0,0,1)]*len(verts))
disk('FrontCamera',0,H/2-.041,.037,.015,lens)
disk('FrontSensor',.038,H/2-.041,.037,.006,dark)
slab('RearCameraIsland',.27,.27,.05,-.060,-.029,.006,metal,glass,offset=(-W/2+.20,H/2-.20,0))
for x,y in [(-W/2+.16,H/2-.16),(-W/2+.26,H/2-.25)]:
    disk('RearLensRing',x,y,-.061,.05,metal,True);disk('RearLens',x,y,-.062,.04,lens,True)
box('USB-C',W/2+.0003,0,0,.002,.092,.025,dark)
for side in [-1,1]:
    for sign in [-1,1]:
        for i in range(7): box('SpeakerRecess',side*(W/2+.0003),sign*(.51+i*.031),0,.002,.014,.015,dark)
box('PowerButton',-W/2-.008,H/2-.25,0,.019,.16,.027,button)
for x in [-W/2+.23,-W/2+.41]: box('VolumeButton',x,H/2+.007,0,.13,.018,.027,button)

while len(blob)%4:blob.append(0)
gltf=dict(asset=dict(version='2.0',generator='Lilypad original 11-inch iPad Pro mesh generator'),scene=0,scenes=[dict(nodes=list(range(len(nodes))))],nodes=nodes,meshes=meshes,materials=materials,accessors=accessors,bufferViews=views,buffers=[dict(byteLength=len(blob))])
j=json.dumps(gltf,separators=(',',':')).encode();j+=b' ' * (-len(j)%4)
output=struct.pack('<4sII',b'glTF',2,12+8+len(j)+8+len(blob))+struct.pack('<I4s',len(j),b'JSON')+j+struct.pack('<I4s',len(blob),b'BIN\x00')+blob
path=Path(__file__).resolve().parents[1]/'public/models/ipad-pro.glb';path.parent.mkdir(exist_ok=True);path.write_bytes(output)
print(f'{path.name}: {len(output):,} bytes, {len(meshes)} meshes')
