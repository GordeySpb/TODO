function PubSub() {
    const events = {};

    return {
        /**
         * subscribe - Действие при возникновении события
         *
         * @param  {String} type        Тип события
         * @param  {Function} listener  Слушатель
         */
        subscribe(type, listener) {
            events[type] = events[type] || [];
            events[type].push(listener);
        },

        /**
         * emit - Тригер события
         *
         * @param  {String} type Тип события
         * @param  {any} arg     Данные для слушателя
         */
        emit(type, arg) {
            if (events[type]) {
                events[type].forEach(listener => listener(arg));
            }
        }
    }
}

const pubSub = PubSub();


module.exports = pubSub;