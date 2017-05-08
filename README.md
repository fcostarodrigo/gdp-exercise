# gdp-exercise

Open code test for GDP

Using: ES6, express, mongodb (mongoose), mocha, and chai.

## Installing development tools

    sudo apt-get install git
    sudo apt-get install npm
    sudo npm update npm -g
    sudo npm install n -g
    sudo n v7.7.3
    sudo npm install yarn -g

Warning: Node is installed as nodejs instead of node in some systems.
To avoid this problem in Ubuntu, install the package nodejs-legacy instead.

## Setup

    yarn install

or

    npm install

## Test

    PASSWORD=XXXXXX PORT=8888 npm test

## Run

    npm start [password] [port]

## Database

The database is hosted on [mlab.com](https://mlab.com/).

## API

`GET /customers`: Get a list of customers, necessary to find the checkout entity.

`GET /products`: Get a list of products, necessary to add items to a checkout.

`GET /customers/:customerId/checkouts/active`: Get the active checkout of a customer.

`POST /customers/:customerId/checkouts/active/items`: Add an item to a customer's checkout.

`POST /customers/:customerId/checkouts`: Creates a new checkout for a customer, archiving the previous.

## Backdoors

`GET /drop`: Drops the database.

`GET /make`: Populates the database with the `.json` files in the data directory.

## License

[MIT](LICENSE.md)