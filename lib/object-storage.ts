import { AwsClient } from 'aws4fetch';
import { config } from './server-env';
import { HttpError,limitedBody } from './admin-security';
export async function uploadImage(request:Request) {
  const bytes=await limitedBody(request,8*1024*1024);
  const ascii=(start:number,n:number)=>new TextDecoder().decode(bytes.slice(start,start+n));
  let ext='';let type='';
  if(bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff){ext='jpg';type='image/jpeg';}
  else if(bytes[0]===137&&ascii(1,3)==='PNG'&&bytes[4]===13&&bytes[5]===10){ext='png';type='image/png';}
  else if(ascii(0,4)==='RIFF'&&ascii(8,4)==='WEBP'){ext='webp';type='image/webp';}
  else if(['GIF87a','GIF89a'].includes(ascii(0,6))){ext='gif';type='image/gif';}
  else throw new HttpError(415,'仅支持 JPG、PNG、WebP、GIF 图片，最大 8 MB');
  const c=await config();if(!c.S3_ACCESS_KEY_ID||!c.S3_SECRET_ACCESS_KEY||!c.S3_ENDPOINT||!c.S3_BUCKET||!c.S3_PUBLIC_URL)throw new HttpError(503,'图片存储未配置');
  const key=`website/news/${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}.${ext}`;
  const aws=new AwsClient({accessKeyId:c.S3_ACCESS_KEY_ID,secretAccessKey:c.S3_SECRET_ACCESS_KEY,service:'s3',region:c.S3_REGION||'us-east-1',retries:1});
  const uploaded=await aws.fetch(`${c.S3_ENDPOINT}/${c.S3_BUCKET}/${key}`,{method:'PUT',headers:{'Content-Type':type,'Cache-Control':'public, max-age=31536000, immutable'},body:bytes,signal:AbortSignal.timeout(20000)});
  if(!uploaded.ok)throw new HttpError(502,'图片上传失败，请检查对象存储配置后重试');
  const url=`${c.S3_PUBLIC_URL.replace(/\/$/,'')}/${key}`;
  const check=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(10000)});
  if(!check.ok)throw new HttpError(502,'图片已上传但外链不可读，请检查 website/ 目录读取权限');
  return {url};
}
