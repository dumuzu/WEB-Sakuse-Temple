// Build only the checked-in static files. No network or student dependencies.
import { cp, readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'dist');
if(path.dirname(output)!==root || path.basename(output)!=='dist') throw new Error('Invalid build directory');
const assets=JSON.parse(await readFile(path.join(root,'assets-manifest.json'),'utf8'));
const audit=[];
for(const asset of assets){
  const data=await readFile(path.join(root,'public',asset.local));
  if(data.length<1000 || data[0]!==255 || data[1]!==216) throw new Error(`Invalid photo: ${asset.id}`);
  audit.push({id:asset.id,file:asset.local,source:asset.source,license:asset.license,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')});
}
await rm(output,{recursive:true,force:true});
await cp(path.join(root,'public'),output,{recursive:true});
await mkdir(path.join(output,'assets'),{recursive:true});
await writeFile(path.join(output,'assets/photo-build-audit.json'),JSON.stringify(audit,null,2));
console.log(`Static build ready. ${audit.length} local photos; no network requests.`);
