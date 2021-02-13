import { App } from './app';
import cors  from 'cors';


async function main() {
    const app = new App(3000);
    await app.listen();
}

main();