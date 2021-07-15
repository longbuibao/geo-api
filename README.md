
# geo-api

Là một api trả về các dạng geojson cho các dữ liệu mô tả dịch COVID-19 

## Cài đặt

sử dụng [npm](https://www.npmjs.com/) để cài đặt API này.

##### Cho Ubuntu và Debian

```bash
sudo apt install nodejs
sudo apt install npm
npm install
```
##### Cho Windows

Cài đặt node.js và npm [[instruction]](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Cài đặt mongodb
##### Cho Ubuntu và Debian 
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
sudo apt update
sudo apt install mongodb-org
sudo systemctl start mongod.service
```
##### Cho Windows [[instruction]](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


## Sử dụng
#### tạo file `.evn` trong thư mục root của ứng dụng
```
mongo_uri=tên database
```
Ví dụ tên database là `covid-tracker`
#### Tạo cơ sở dữ liệu tên `covid-tracker` và import các dữ liệu tương ứng trong thư mục `db` bằng `mongodb compass`
#### Ví dụ với file `diseases.json` thì tạo một `collection` mới tên là `diseases`, tương tự cho các file còn lại
`diseases.json`
`events.json`
`patients.json`
`phongtoas.json`
`points.json`
`status.json`
`times.json`
`vungcachlis.json`
#### Sau khi có được dữ liệu trong database, cài các gói `npm` tương ứng bằng lệnh
`npm install`
#### Sau khi cài được các gói `npm` thì gõ
`npm run dev`
#### Sau đó mở `http://localhost:3000` và thưởng thức

## License
[MIT](https://choosealicense.com/licenses/mit/)
