import cron from 'node-cron'
import harvester from './harvester'
import updater from './updater'
import supabase from './supabase'

cron.schedule(`* * * * *`, async () => {
    await harvester()
    await updater()
});

// updater()
//     .then(() => process.exit())
// harvester()
//     .then(() => process.exit())
