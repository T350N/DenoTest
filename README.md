Testing Deno, I'm using TypeScript and the Hono framework.


Deno is a JavaScript and TypeScript runtime based on the V8 engine and written in Rust. It was created by Ryan Dahl, the original creator of Node.js, and focuses on security and productivity.

For use, you have to run script "deno run --watch main.ts", and then just have to run "deno run main.ts"

Try this comamands if you have problems:
* Deno init
* Det-ExecutionPolicy RemoteSigned -Scope CurrentUser
* Get-ExecutionPolicy
* Deno --version
* npm install hono
* npm audit fix --force
* npm run fetch-schema
* deno task generate
* deno run --allow-env --allow-net main.ts
* deno task build
* deno run --watch main.ts
