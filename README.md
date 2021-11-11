# cs3219-TaskF

## Instructions
1. Build docker file:
```
docker build -t server . 
```
2. Run docker file
```
docker-compose up
```

3. Delete all data by:
```
localhost:9600/delete_data?dataType=email
```

4. Get email by:
```
localhost:9600/get_email
```