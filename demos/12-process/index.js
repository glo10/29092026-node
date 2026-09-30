
import { loadEnvFile } from "node:process" // idem que l'utilisation via l'objet global process process.loadEnvFile('.env')
const { argv, env, platform, arch, version, versions } = process
console.log('les variables les plus utiles', argv, env, platform, arch, version, versions )
