# Fusion website
This web page is intended for the Fusion Party (https://fusionparty.org.au/).

View it live at http://fusion-party-website.s3-website-us-east-1.amazonaws.com/

## Running locally
* `python -m http.server`
* Open a browser and visit <http://localhost:8000> (or whatever port is mentioned after running the above command) 

## Deployment
```shell
export AWS_PROFILE=owen
aws s3 cp index.html s3://fusion-party-website/
aws s3 cp styles.css s3://fusion-party-website/
aws s3 cp rings.css s3://fusion-party-website/
… 
```
