import React from "react";

type PropTypes = {
    date: string,
}

function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function getDaysInMonth(date) {

    const DAYS_IN_MONTH = ['31','28','31','30','31','30','31','31','30','31','30','31'];
    const month = date.getMonth();
    const year = date.getFullYear();

    if (isLeapYear(year) && month === 1) {
        return DAYS_IN_MONTH[month] + 1;
    } else {
        return DAYS_IN_MONTH[month];
    }
}

function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();
    if(dayOfWeek === 0) return 6;

    return dayOfWeek - 1;
}

function areEqual(date, currentDate) {
    if(!date || ! currentDate) return false;

    return (
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() === currentDate.getDate()
    );
}

function getMonthData(year, month) {

    const DAYS_IN_WEEK = 7;
    const result = [];
    const date = new Date(year, month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let firstDayOfMonth = new Date(year, month,1);
    let lastDayOfMonth = new Date(year, month+1,0);
    let day = 1;

    for (let i = 0; i < (Number(daysInMonth) + Number(monthStartsOn)) / DAYS_IN_WEEK; i++) {
        result[i] = [];

        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if(day > daysInMonth){
                lastDayOfMonth.setDate(lastDayOfMonth.getDate() + 1);
                result[i][j] = lastDayOfMonth;
                console.log('Конец календаря');
            } else if (i === 0 && j < monthStartsOn) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1);
                result[i][j] = firstDayOfMonth;
                console.log('Начало календаря');
            } else {
                result[i][j] = new Date(year, month, day++);
            }
        }
    }

    return result;
}

function Calendar(props:PropTypes){

    const defaultProps = {
        weekDayNames:['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        days : ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        months : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        declMonths : ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    };
    const { weekDayNames, days, months, declMonths } = defaultProps;
    const { date } = props;

    const monthData = getMonthData(date.getFullYear(),date.getMonth());
    const currentDate = new Date();

    return (<div>
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{days[currentDate.getDay()]}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{currentDate.getDate()}</div>
                    <div className="ui-datepicker-material-month">{declMonths[currentDate.getMonth()]}</div>
                    <div className="ui-datepicker-material-year">{currentDate.getFullYear()}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{months[currentDate.getMonth()]}</span>&nbsp;<span
                    className="ui-datepicker-year">{currentDate.getFullYear()}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                <tr>
                    {weekDayNames.map((name, index) =>
                        <th key={index} scope="col" title="name">{name}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {monthData.map((week, index) =>
                    <tr key={index}>
                        {week.map((date, index) => date ?
                            <td
                                key={index}
                                className={areEqual(date, currentDate) ? 'ui-datepicker-today': ''}
                            >
                                {date.getDate()}
                            </td> :
                            <td key={index}/>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </div>);
}

export default Calendar;