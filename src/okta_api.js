import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_OKTA,
  json: true,
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      params: {
        activate: false,
      },
      headers: {
        Authorization: `SSWS ${process.env.VUE_APP_OKTA_TOKEN}`,
      },
    }).then(req => req.data).catch(error => error);
  },
  postUser(fname, lname, email) {
    const newOktaUser = {
      profile: {
        firstName: fname,
        lastName: lname,
        email,
        login: email,
      },
    };
    return this.execute('post', '/users', newOktaUser);
  },
};
/*
const client = new okta.Client({
  orgUrl: process.env.VUE_APP_AUTH_BASE_URL,
  token: process.env.VUE_APP_OKTA_TOKEN,
  requestExecutor: new okta.DefaultRequestExecutor(),
});

async postUser(fname, lname, email) {
    const newOktaUser = {
      profile: {
        firstName: fname,
        lastName: lname,
        email,
        login: email,
      },
    };
    await client.createUser(newOktaUser, { activate: false })
      .then(user => user);
  },
*/

/* axios request
axios.post('https://dev-749221.oktapreview.com/api/v1/users', {
  {
    profile: {
      firstName: fname,
      lastName: lname,
      email,
      login: email,
    },
  },
  params: {
    activate: false,
  },
})
.then(user => user);
*/

/* no credentials
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  }
}' "https://dev-749221.oktapreview.com/api/v1/users?activate=false"
*/
