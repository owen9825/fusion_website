# Fusion website
This web page is intended for the Fusion Party (https://fusionparty.org.au/).

View it live at http://fusion-party-website.s3-website-us-east-1.amazonaws.com/

## Running locally
* `python -m http.server`
* Open a browser and visit <http://localhost:8000> (or whatever port is mentioned after running the above command) 

## Deploying CDN assets
For large assets that are unlikely to change frequently (eg images and videos), it's best to deploy them to Cloudflare.
Cloudflare was chosen over AWS Cloudfront since it has a free tier with [data centres in 7 Australian cities](https://www.cloudflare.com/en-au/network/)
(Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra and Hobart. By comparison, AWS Cloudfront is only present in 
[3 Australian cities](https://aws.amazon.com/cloudfront/features/?nc1=h_ls&whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc).  

[Cloudflare R2](https://www.cloudflare.com/en-au/press-releases/2021/cloudflare-announces-r2-storage/) is equivalent to 
AWS S3 and can even be used with the AWS CLI.

You should create a local file `credentials.env` like this:
```shell
export CLOUDFLARE_TOKEN=…
export AWS_PROFILE=fusion-cloudflare
```
Then add Cloudflare to your AWS credentials in `~./aws/credentials`:
```shell
[fusion-cloudflare]
aws_access_key_id = …
aws_secret_access_key = …
```
So now, activate your credentials file and run some commands (these examples are specific to the bucket being used in this project):
```shell
source env.credentials
aws s3api list-objects --bucket fusion-assets --endpoint-url https://ea5bd9ef975707ea2e4d11229641a447.r2.cloudflarestorage.com
aws s3api put-object --bucket fusion-assets --endpoint-url https://ea5bd9ef975707ea2e4d11229641a447.r2.cloudflarestorage.com --body images/woman_at_eucalyptus_valley_358.webp --key images/woman_at_eucalyptus_valley_358.webp 
```

Notice that although R2 assets can be accessed publicly, Cloudflare won't serve them through a CDN unless we attach them
to a domain name. Owen has purchased the name [fusionparty.space](https://fusionparty.space) from Namecheap.    

## Deploying web pages
```shell
export AWS_PROFILE=owen
aws s3 cp index.html s3://fusion-party-website/
aws s3 cp styles.css s3://fusion-party-website/
aws s3 cp rings.css s3://fusion-party-website/
… 
```
