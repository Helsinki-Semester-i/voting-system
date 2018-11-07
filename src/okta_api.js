import okta from '@okta/okta-sdk-nodejs';

const client = new okta.Client({
  orgUrl: process.env.VUE_APP_AUTH_BASE_URL,
  token: process.env.VUE_APP_OKTA_TOKEN,
  requestExecutor: new okta.DefaultRequestExecutor(),
});

export default {
  async postUser(fname, lname, email) {
    const newOktaUser = {
      profile: {
        firstName: fname,
        lastName: lname,
        email,
        login: email,
      },
    };
    client.createUser(newOktaUser, { activate: false })
      .then(user => user);
  },
};
