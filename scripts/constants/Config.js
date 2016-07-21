import assign from 'object-assign';

const Env = {

  COMMON: {
    IS_DEV: false,

    IS_PREPROD: false,

    contact_email: 'l.lefloch.91@gmail.com',

    github_repository_link: 'http://github.com/loiclefloch/bm',

    github_api_repository_link: 'http://github.com/loiclefloch/bm',

    Logger: {
      SENTRY_URL: ''
    }
  },

  LOCAL: {
    IS_DEV: true,

    HOSTNAME: 'localhost',

    SERVER_URL: 'http://localhost:90/bm-api/web/app_dev.php',

    API_URL: 'http://localhost:90/bm-api/web/app_dev.php/api',

    Auth: {
      client_id: '3_41usi26rwc6cs4gwcooskss8g0ww0kg44coowg0wkoc4cwwkgs',
      client_secret: '3wgrk1sdtny88skgsk00o8cc8o84swos4gckkgc4skw00s84ss',
      grant_type: 'password'
    }

  },

  DEV: {
    IS_DEV: true,

    HOSTNAME: 'bm.loiclefloch.fr',

    SERVER_URL: 'http://bm_api.loiclefloch.fr/app_dev.php',

    API_URL: 'http://bm_api.loiclefloch.fr/app_dev.php/api',

    Auth: {
      client_id: '1_4fpqq4qixvy84skg0oskkccc0wk84wwss48cckos48g0488g0s',
      client_secret: '584tmbzo4ngo80gc4gss0sss0cg4wc8ss4s80s888ww4ocowks',
      grant_type: 'password'
    }

  },

  PRODUCTION: {}

};

let currentEnv = Env.DEV;
const hostname = window.location.hostname;
if (hostname === Env.LOCAL.HOSTNAME) {
  currentEnv = Env.LOCAL;
  // currentEnv = Env.DEV;
} else if (hostname === Env.DEV.HOSTNAME) {
  currentEnv = Env.DEV;
}

export default assign({}, Env.COMMON, currentEnv);
