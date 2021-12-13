# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch` 
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.



```bash
# Build docker image
docker build -t abcl0653/cap-service -f Dockerfile .   

# Push image to hub.docker.com
docker push abcl0653/cap-service 

# deploy to Kyma
kubectl create namespace dev
kubectl -n dev apply -f ./deployment/deployment.yml
kubectl -n dev apply -f ./deployment/apirule.yaml
```

