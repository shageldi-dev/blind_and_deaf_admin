import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    ru: {
        translation: {
            "home_page": "Главная",
            "news":"Новости",
            "projects":"Проекты",
            "constants":"Константы",
            "help":"Помощь",
            "dashboard":"Приборные панели",
            "latest_notif":"Последние уведомления",
            "fullname":"ФИО",
            "email":"Эл. адрес",
            "date":"Дата",
            "message":"Сообщение",
            "certificate":"Сертификат",
            "phone":"Номер телефона",
            "News count:":"Количество новостей:",
            "Project count:":"Количество проектов:",
            "Visit":"Посещать",
            "Visit count:":"Количество посещений:",
            "Notification":"Уведомление",
            "Notification count:":"Количество уведомлений:",
            "News view":"Просмотр новостей",
            "News view count:":"Количество просмотров новостей:",
            "Projects view":"Просмотр проектов",
            "Projects view count:":"Количество просмотров проектов:",
            "Inbox":"Входящие",
            "Know more":"Узнать больше",
            "want_delete":"Вы хотите удалить?",
            "Deleted!":"Удалено!",
            "ID":"ID",
            "Image":"Изображение",
            "Title":"Заголовок",
            "Views":"Просмотры",
            "Date":"Дата",
            "Delete":"Удалить",
            "Edit":"Редактировать",
            "Start typings...":"Начать печатать...",
            "Successfully added!":"Успешно добавлено!",
            "Something went wrong!":"Что-то пошло не так!",
            "Add":"Добавлять",
            "Please wait...":"Пожалуйста подождите...",
            "Title tm":"Название тм",
            "Title ru":"Название ru",
            "Title en":"Название en",
            "Images*":"Картинки*",
            "Single video (optional)":"Одно видео (необязательно)",
            "Additional files (optional)":"Дополнительные файлы (необязательно)",
            "Content TM":"Контент ТМ",
            "Content RU":"Контент RU",
            "Content EN":"Контент EN",
            "Upload":"Загрузить",
            "Successfully updated!":"Успешно обновлено!",
            "Save":"Сохранять",
            "Clear selections":"Очистить выбор",
            "Name":"название",
            "Open certificate":"Открыт сертификат",
            "Certificate Image*":"Изображение сертификата*",
            "Certificate file*":"Файл сертификата*",
            "Please enter required informations!":"Пожалуйста, введите необходимую информацию!",
            "Success":"Успех",
            "WELCOME":"ДОБРО ПОЖАЛОВАТЬ",
            "Enter your username and password":"Введите имя пользователя и пароль",
            "Username...":"Имя пользователя...",
            "Password...":"Пароль...",
            "Login":"логин"
        }
    },
    tm: {
        translation: {
            "home_page": "Baş sahypa",
            "news":"Täzelikler",
            "projects":"Proýektler",
            "constants":"Konstantlar",
            "help":"Kömek",
            "dashboard":"Hasabat paneli",
            "latest_notif":"Soňky hatlar",
            "fullname":"Doly ady",
            "email":"Elektron poçta",
            "date":"Sene",
            "message":"Habar",
            "certificate":"Sertifikat",
            "phone":"Telefon belgi",
            "News count:":"Täzelikler sany:",
            "Project count:":"Proýektler sany:",
            "Visit":"Giriş",
            "Visit count:":"Giriş sany:",
            "Notification":"Hatlar",
            "Notification count:":"Hatlar sany:",
            "News view":"Täzelik okalmalary",
            "News view count:":"Täzelik okalmalary sany:",
            "Projects view":"Proýekt okalmalary",
            "Projects view count:":"Proýekt okalmalary sany:",
            "Inbox":"Gelýän hatlar",
            "Know more":"Doly oka",
            "want_delete":"Pozmak isleýärsiňizmi?",
            "Deleted!":"Pozuldy!",
            "ID":"ID",
            "Image":"Surat",
            "Title":"Sözbaşy",
            "Views":"Görülme",
            "Date":"Sene",
            "Delete":"Pozmak",
            "Edit":"Üýtgetmek",
            "Start typings...":"Giriz...",
            "Successfully added!":"Üstünlikli goşuldy!",
            "Something went wrong!":"Ýalňyşlyk ýüze çykdy!",
            "Add":"Goşmak",
            "Please wait...":"Biraz garaşyň...",
            "Title tm":"Türkmençe sözbaşy",
            "Title ru":"Rusça sözbaşy",
            "Title en":"Iňlisçe sözbaşy",
            "Images*":"Suratlary*",
            "Single video (optional)":"Ýeke wideo (hökmany däl)",
            "Additional files (optional)":"Goşmaça faýllar (hökmany däl)",
            "Content TM":"Türkmençe mazmuny",
            "Content RU":"Rusça mazmuny",
            "Content EN":"Iňlisçe mazmuny",
            "Upload":"Ýüklemek",
            "Successfully updated!":"Üstünlikli üýtgedildi!",
            "Save":"Ýatda saklat",
            "Clear selections":"Saýlanmalary aýyr",
            "Name":"Ady",
            "Open certificate":"Sertifikady gör",
            "Certificate Image*":"Sertifikat suraty*",
            "Certificate file*":"Sertifikat faýly*",
            "Please enter required informations!":"Gerekli maglumatlary giriziň!",
            "Success":"Üstünlikli",
            "WELCOME":"HOŞ GELDIŇIZ",
            "Enter your username and password":"Ulanyjy adyňyzy we parolyňyzy giriziň",
            "Username...":"Ulanyjy ady ...",
            "Password...":"Parol ...",
            "Login":"Içeri gir"
        }
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "ru", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;