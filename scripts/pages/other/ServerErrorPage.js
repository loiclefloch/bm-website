import React from 'react';
import _ from 'lodash';

// import SessionAction from 'actions/SessionAction';
// import SessionStore from 'stores/SessionStore';
import ServerStore from 'stores/ServerStore';
import Config from 'constants/Config';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent';
import FontAwesome from 'react-fontawesome';

export default class ServerErrorPage extends AbstractComponent {

  state = {
    error: ServerStore.getServerError()
  };

  copyReport() {
    console.log('copy report');
    const elem = $('.server_error_page__report');

    BM.copyTextOnElement(elem, 'Report copied to clipboard');
  }

  render() {
    let errorData = this.state.error;

    if (_.isUndefined(errorData.body) && Config.IS_DEV) { // testing data
      errorData = {
        body: {
          message: 'Error message'
        },
        req: {
          url: 'http://www.local.bm/app_dev.php/api/bookmarks',
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            Blah: 'application/json',
            Authorization: 'r9r8hf87fb321f731f347387f37gf347'
          },
          _data: {
            username: 'username',
            email: 'email',
            url: 'github.com',
            name: 'test name'
          }
        }
      };
    }

    const message = errorData.body.message;
    const detail = errorData.body.message.detail;

    const headers = errorData.req.header;
    const dataSent = errorData.req._data;

    // remove headers that should not be public
    delete headers["Authorization"];

    // remove critical datas..
    delete dataSent["password"];
    delete dataSent["pwd"];
    delete dataSent["email"];
    delete dataSent["username"];


    const requestInfo = {
      method: errorData.req.method,
      url: errorData.req.url,
      data: [],
      headers: []
    };

    // Data headers
    for (const key in headers) {

      if (headers.hasOwnProperty(key)) {

        requestInfo['headers'].push(
          <div key={key}>
            {key} : {headers[key]}
          </div>
        )
      }

    }

    // -- Data
    for (key in dataSent) {

      if (dataSent.hasOwnProperty(key)) {

        let data = dataSent[key];

        if (_.isEmpty(data)) {
          data = "(null)"
        }

        requestInfo['data'].push(
          <div key={key}>
            {key} : {data}<br />
          </div>
        )
      }

    }

    return (
      <div id="server_error_page">
        <h1 className="text-center">An error occured on the API</h1>

        <div className="top-buffer-50">
          <h2 className="text-center">Please report this error</h2>

          <div className="row" className="top-buffer-50 text-center">

            <div className="col-xs-6 server_error_page__github">
              <a href={Config.github_api_repository_link + "/issues"} target="_blank">
                Github
                <br />
                <FontAwesome
                  className='server_error_page__github_icon'
                  name='github'
                  size='5x'
                  //spin
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
              </a>
            </div>

            <div className="col-xs-6 server_error_page__email">
              <a href={Config.contact_email}>
                Email
                <br />
                <FontAwesome
                  className='server_error_page__email_icon'
                  name='envelope'
                  size='5x'
                  //spin
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="clear"></div>
        <div className="separator-medium top-buffer-50"></div>

        <div className="top-buffer-50 text-center">
          <h2 >Error detail</h2>

          <p>Please provide the following error description</p>

          <button className="btn btn-primary" onClick={this.copyReport}>Copy the report</button>

          <div className="row">

            <div className="col-sm-12">
              <pre className="server_error_page__report text-left">
                # Response info<br />
                ------------------------------------------------------------<br />

                Message: {message}<br />
                Details: {detail}<br />

                <br /><br />
                #Request info:<br />
                ------------------------------------------------------------<br />

                [{requestInfo.method}] {requestInfo.url}<br /><br />

                ------------------------------<br />
                ## headers<br />
                ------------------------------<br />

                {requestInfo.headers}<br />

                ------------------------------<br />
                ## data<br />
                ------------------------------<br />
                {requestInfo.data}<br />
              </pre>
            </div>

          </div>


        </div>
      </div>
    );
  }
}
