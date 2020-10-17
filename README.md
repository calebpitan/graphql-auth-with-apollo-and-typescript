# GraphQL Authentication with Apollo and TypeScript

This repository is an example project that shows how to implement authentication and authorization in GraphQL in a more real life approach. More real than most examples you'd find out there, implemented lazily, because their authors didn't commit time to writing something detailed.

How to do authentication in GraphQL is one of the first question that pops in the mind of anyone new to GraphQL. Here I am answering that question in a way more robust. You might almost, as well, call it full-fledged.

**This example uses:**

- TypeScript
- Apollo GraphQL
- MongoDB
- Mongoose/Typegoose
- Express
- express-session
- JSON Web Token

## Using this project as a starter template

If you wish to start an app with a similar stack, you can just clone this repo for free. Most of the bootstrapping has been done already. If not exactly the same stack you planned for, then just customize it to fit your needs.

## Getting started

Here are some few optional steps to get you started

### Get your copy

1. **Clone this repo using Github Desktop:** By clicking the green "Code" button above, you get the option to open this repo in Github Desktop.

2. **Clone from bash:** Open up git bash, `cd` to the directory you want it cloned to and hit the following commands

```bash
# Using SSH
git clone git@github.com:calebpitan/graphql-auth-with-apollo-and-typescript.git

# Using HTTPS if still suported
git clone https://github.com/calebpitan/graphql-auth-with-apollo-and-typescript.git
```

### Install dependencies

You should have a `graphql-auth-with-apollo-and-typescript` folder in your directory, rename it to whatever you like or just leae it anyway

```bash
cd graphql-auth-with-apollo-and-typescript
```

Then you can decide to install the dependencies using either `npm` or `yarn` (I used yarn initially)

```bash
# Install using yarn
yarn install

# Install using npm (You may want to delete the yarn.lock file)
npm install
```

### Set your environment variables

This project uses MongoDB and the connection string exists as `MONGO_CONNECT_STRING` in the [.env.example](https://github.com/calebpitan/graphql-auth-with-apollo-and-typescript/tree/master/.env.example) file. There also exists other variables like `SECRET` for password hashing.

Rename the file to `.env` and input your own values there. This file would be loaded using [dotenv](https://github.com/motdotla/dotenv)

### Run the script

Now you can run:

```bash
yarn start

# or

npm start
```

## Contributing

Wish to contribute? Create your fork, set this repo as an upstream and leave a pull request

```bash
git remote add upstream git@github.com:calebpitan/graphql-auth-with-apollo-and-typescript.git
```

## License

Licensed under the [MIT License](https://github.com/calebpitan/graphql-auth-with-apollo-and-typescript/tree/master/LICENSE)
