import assign from 'object-assign';

const Env = {

  COMMON: {
    IS_DEV: false,

    IS_PREPROD: false,

    contact_email: 'l.lefloch.91@gmail.com',

    github_repository_link: 'http://github.com/loiclefloch/bm',

    github_api_repository_link: 'http://github.com/loiclefloch/bm'
  },

  DEV: {
    IS_DEV: true,

    SERVER_URL: 'http://localhost:90/bm-api/web/app_dev.php',

    API_URL: 'http://localhost:90/bm-api/web/app_dev.php/api',

    Auth: {
      client_id: '3_41usi26rwc6cs4gwcooskss8g0ww0kg44coowg0wkoc4cwwkgs',
      client_secret: '3wgrk1sdtny88skgsk00o8cc8o84swos4gckkgc4skw00s84ss',
      grant_type: 'password'
    }

  },

  PRODUCTION: {}

};

const currentEnv = Env.DEV;

export default assign({}, Env.COMMON, currentEnv);