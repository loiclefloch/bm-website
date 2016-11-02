import inject from './inject';

/**
 * Injects component's props in the decorated function as first parameter.
 *
    class User extends React.Component {

     static propTypes = {
       name: React.PropTypes.string,
       surname: React.PropTypes.string,
     }

     @injectProps
     getFullName({ name, surname }, separator) {
       return `${name}${separator}${surname}`;
     }

     render() {
       return (
         <div>
           {this.getUsername('-')}
         </div>
       );
     }
    }
 */
export default inject('props');
