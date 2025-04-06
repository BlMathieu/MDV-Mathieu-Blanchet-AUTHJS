const dotenv = require('dotenv');
dotenv.config();
const baseUrl = `http://localhost:${process.env.SERVER_PORT}/authentication/register`
// ÉTUDIANTS
const get = async () => {
    try {
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'Jason.token@webjwt.com',
                username: 'Jason',
                password: '123456',
                role: 'étudiant'
            })
        });
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'etudiant2@gmail.com',
                username: 'Rabit',
                password: '123456',
                role: 'étudiant'
            })
        });
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'JeVeuxUneAlternance@rapidement.com',
                username: 'HelloWorld',
                password: '123456',
                role: 'étudiant'
            })
        });

        // INTERVENANTS

        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'intervenant@gmail.com',
                username: 'WindowsXP',
                password: '987654',
                role: 'intervenant'
            })
        });
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'intervenant2@gmail.com',
                username: 'WindowsVista',
                password: '987654',
                role: 'intervenant'
            })
        });
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'intervenant3@gmail.com',
                username: 'Windows7',
                password: '987654',
                role: 'intervenant'
            })
        });

        // ADMINS 

        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@gmail.com',
                username: 'WinDevEnjoyer',
                password: 'azertyuiop',
                role: 'admin'
            })
        });
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'insertInto@gmail.com',
                username: 'SqlNinja',
                password: 'azertyuiop',
                role: 'admin'
            })
        });
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: 'linustorvald@windobe.com',
                username: 'Linus',
                password: 'GNU',
                role: 'admin'
            })
        });
    } catch (err) {
        console.error(err);
    }
}
get();