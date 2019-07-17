# vSense-Web

>### Setting Up

#### 1. Clone Repository
Run `git clone https://github.com/KY64/vSense-Web.git` on Terminal or just click **Download**

#### 2. Install dependencies
Navigate to repo directory
```
$ cd vSense-Web
```
Install dependencies
```
$ npm i
```

#### 3. Run the web
To run web on local server:
```
npm run test
```
or just navigate to https://vsense.herokuapp.com/
___
___
>### Post/Get/Delete

Let's assume when I write this
```
/index
```

is equal to
```
[website url]/index
ex: localhost:3000/index
```

## GET
#### List Sensor Data
___
### /data
___
#### List Specified Sensor Data

* `sensor` : sensor name/type
___
### /data/_[sensor]_
___

## POST
#### Upload Sensor Data

* `sensor` : sensor name/type
* `val` : sensor value
___
### /data?sensorName=*[sensor]*&value=*[val]*
___

## DELETE
#### Delete All Sensor Data
___
### /data
___
#### Delete Specified Data
* `id` : data ID
___
### /data/_[id]_
___
