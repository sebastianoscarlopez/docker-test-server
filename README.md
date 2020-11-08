Docker test with a simple nodejs express server and a mongo database

To install run ./build.sh

Testing everything is ok

First run this command to add some item

curl --location --request POST 'http://localhost:3000/addItem' \
--header 'Content-Type: application/json' \
--data-raw '{
    "a": "value other a",
    "b": "value other b"
}'

Second see the items in the browser

http://localhost:3000/getList
