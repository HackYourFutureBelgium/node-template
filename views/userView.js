// views/userView.js

import ejs from 'ejs';

function renderUserPage(user) {
    const html = ejs.render(
        `
        <html>
            <body>
                <h1>Welcome, <%= user.name %></h1>
                <p>Email: <%= user.email %></p>
            </body>
        </html>
        `,
        { user }
    );

    return html;
}

export { renderUserPage };
