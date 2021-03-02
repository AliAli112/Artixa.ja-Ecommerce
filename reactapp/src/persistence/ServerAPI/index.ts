import { App } from './app';
import cors  from 'cors';


async function main() {
    const app = new App(3005);
    await app.listen();
}

main();