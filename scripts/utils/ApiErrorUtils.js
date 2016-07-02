import _ from 'lodash';
import ApiError from 'entities/ApiError';

import Logger from 'utils/Logger';

class ApiErrorUtils {

  static getBookingSettingError(apiError:ApiError):String {
    const errors = {
      101: 'Vous devez créer au moins une salle.',

      102: 'Vous devez ajouter au moins une période.',

      103: 'La capacité doit-être positive.',

      106: 'Les réservations ne peuvent être ouvertes dans le passé.',

      105: 'Le délai minimum pour réservation immédiate doit être positif.',

      107: 'Le numéro de téléphone est invalide.',

      108: 'L\'addresse email est invalide.',

      112: 'Le nombre de couvert maximum pour validation automatique est invalide.',

      115: 'Une heure d\'ouverture est invalide',

      117: 'Il y a deux fois les mêmes paramètres spécifiques à jour d\'une période',

      118: 'Capacité invalide.',

      121: 'Les heures d\'ouverture doivent être supérieurs à une heure.',

      122: 'La capacité de la pièce est plus grande que la capacité maximum du restaurant.',

      123: 'La capacité des pièces est plus grande que la capacité maximum du restaurant.',

      127: 'Il manque la paramètre de capacité d\'une pièce.',

      128: 'L\'interval de temps du spécifique est invalide.',

      129: 'La capacité est invalide pour un spécifique'
    };

    return ApiErrorUtils.findErrorOnArray(apiError, errors, `getBookingSettingError`);
  }

  static postBookingError(apiError:ApiError):String {
    const errors = {

      202: 'Le nombre d\'invités doit être positif',

      203: 'Invalid booking settings',

      204: 'La date de la réservation est trop dans le futur.',

      205: 'La date de réservation est trop proche.',

      206: 'La date du booking est dans le passé',

      210: 'Une réservation à déja été faite par l\'utilisateur pour ce repas',

      211: 'Il n\'y a pas d\'horaires disponibles pour cette date.',

      212: 'Il n\'y a pas d\'horaires disponibles pour cette date.',

      213: 'Il n\'y a pas assez de places disponibles à cet horaire pour la salle sélectionée',

      214: 'Il n\'y a pas assez de places disponibles à cet horaire',

      215: 'Nom manquant',

      216: 'Prénom manquant'
    };

    return ApiErrorUtils.findErrorOnArray(apiError, errors, 'postBookingError');
  }

  static getBookingSlotsError(apiError:ApiError):String {
    const errors = {
      200: 'Les réservations sont fermées à cette date',

      201: 'La date donnée est invalide (dans le passé)'
    };

    return ApiErrorUtils.findErrorOnArray(apiError, errors, 'getBookingSlotsError');
  }

  static getRestaurantMenu(apiError:ApiError):String {
    const errors = {
      103: 'Le POS est incompatible.',
      104: 'Impossible de récupérer la carte depuis le POS.',
      105: 'Le POS est incompatible. Impossible de récupérer la carte'
    };

    return ApiErrorUtils.findErrorOnArray(apiError, errors, 'getRestaurantMenu');
  }

  static putRestaurantMenuProduct(apiError:ApiError):String {
    const errors = {
    };

    return ApiErrorUtils.findErrorOnArray(apiError, errors, 'putRestaurantMenuProduct');
  }

  static putRestaurantMenuMenu(apiError:ApiError):String {
    const errors = {
    };

    return ApiErrorUtils.findErrorOnArray(apiError, errors, 'putRestaurantMenuMenu');
  }

  static putRestaurantMenuCategory(apiError:ApiError):String {
    const errors = {
    };

    return ApiErrorUtils.findErrorOnArray(apiError, errors, 'putRestaurantMenuCategory');
  }


  /**
   * @private
   *
   * @param apiError
   * @param errors
   * @param label
   */
  static findErrorOnArray(apiError:ApiError, errors:Object, label:String):String {
    const message = errors[apiError.code];
    if (!_.isUndefined(message)) {
      return message;
    }

    Logger.notImplemented(`${label} Unknown api error`, `[${apiError.code}] ${apiError.message}`);
    return 'Erreur inconnue';
  }

}

export default ApiErrorUtils;
