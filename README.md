# Cash Register

Cash Register is a simple command-line application that simulates the behavior of a cash register. It receives a purchase price, the cash provided, and the denominations available in the drawer. The program calculates the correct change to return, based on the available denominations, or informs whether the transaction is impossible due to insufficient funds or exact drawer closure.

## Features

- Calculates change using the highest denominations first.
- Handles exact change scenarios.
- Handles insufficient funds or empty drawer edge cases.
- Output format matches specific challenge requirements.

## Usage

The main function is `checkCashRegister(price, cash, cid)`, where:

- `price`: total purchase amount.
- `cash`: amount given by the customer.
- `cid`: array of cash-in-drawer, with each denomination and its amount.


