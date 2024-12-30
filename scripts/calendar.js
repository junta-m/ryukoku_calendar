// 年度定数
const YEAR = 2025;
const NEXT_YEAR = YEAR + 1;

// グローバル変数
let globalCalendarData = [];

// 基本データ（手動で設定が必要な部分）
const ACADEMIC_YEAR = {
    FIRST_SEMESTER: {
        start: `${YEAR}-04-09`,
        end: `${YEAR}-07-29`
    },
    SECOND_SEMESTER: {
        start: `${YEAR}-09-19`,
        end: `${NEXT_YEAR}-01-19`
    }
};

// 特別授業日
const SPECIAL_CLASS_DAYS = {
    [`${YEAR}-12-26`]: { classNumber: 12, quarterNumber: 4, prefix: '土', skipFridayCount: true },
    [`${YEAR}-12-27`]: { classNumber: 13, quarterNumber: 5 }
};

// 5講時以降の特別な授業日
const SPECIAL_PERIOD_DAYS = {
    [`${YEAR}-05-14`]: { type: 'cancel', period: 5, note: '5講時以降休講' },
    [`${YEAR}-05-28`]: { type: 'normal', period: 5, classNumber: 6, quarterNumber: 6, note: '5講時以降 6回目' },
    [`${YEAR}-05-31`]: { type: 'substitute', period: 5, classNumber: 7, quarterNumber: 7, dayOfWeek: 3, note: '5講時以降 水曜7回目' }
};

// 特別日程の設定
const SPECIAL_DATES = {
    SATURDAY_ADJUSTMENT: `${YEAR}-12-27`
};

// イベントデータ
const EVENTS = {
    holidays: {
        [`${YEAR}-04-29`]: { name: '昭和の日', type: 'holiday', hasClass: true },
        [`${YEAR}-05-03`]: { name: '憲法記念日', type: 'holiday', hasClass: false },
        [`${YEAR}-05-04`]: { name: 'みどりの日', type: 'holiday', hasClass: false },
        [`${YEAR}-05-05`]: { name: 'こどもの日', type: 'holiday', hasClass: false },
        [`${YEAR}-05-06`]: { name: '振替休日', type: 'holiday', hasClass: false },
        [`${YEAR}-05-21`]: { name: '創立記念日', type: 'special', hasClass: false },
        [`${YEAR}-07-21`]: { name: '海の日', type: 'holiday', hasClass: true },
        [`${YEAR}-08-11`]: { name: '山の日', type: 'holiday', hasClass: false },
        [`${YEAR}-09-15`]: { name: '敬老の日', type: 'holiday', hasClass: false },
        [`${YEAR}-09-23`]: { name: '秋分の日', type: 'holiday', hasClass: false },
        [`${YEAR}-10-13`]: { name: '体育の日', type: 'holiday', hasClass: true },
        [`${YEAR}-10-18`]: { name: '報恩講', type: 'special', hasClass: false },
        [`${YEAR}-10-25`]: { name: '龍谷祭', type: 'special', hasClass: false },
        [`${YEAR}-10-31`]: { name: '龍谷祭', type: 'special', hasClass: false },
        [`${YEAR}-11-01`]: { name: '龍谷祭', type: 'special', hasClass: false },
        [`${YEAR}-11-03`]: { name: '文化の日', type: 'holiday', hasClass: true },
        [`${YEAR}-11-23`]: { name: '勤労感謝の日', type: 'holiday', hasClass: false },
        [`${YEAR}-11-24`]: { name: '振替休日', type: 'holiday', hasClass: true },
        [`${YEAR}-12-28`]: { name: '冬期休暇', type: 'holiday', hasClass: false },
        [`${YEAR}-12-29`]: { name: '冬期休暇', type: 'holiday', hasClass: false },
        [`${YEAR}-12-30`]: { name: '冬期休暇', type: 'holiday', hasClass: false },
        [`${YEAR}-12-31`]: { name: '冬期休暇', type: 'holiday', hasClass: false },
        [`${NEXT_YEAR}-01-01`]: { name: '元日', type: 'holiday', hasClass: false },
        [`${NEXT_YEAR}-01-02`]: { name: '冬期休暇', type: 'holiday', hasClass: false },
        [`${NEXT_YEAR}-01-03`]: { name: '冬期休暇', type: 'holiday', hasClass: false },
        [`${NEXT_YEAR}-01-04`]: { name: '冬期休暇', type: 'holiday', hasClass: false },
        [`${NEXT_YEAR}-01-05`]: { name: '冬期休暇', type: 'holiday', hasClass: false },
        [`${NEXT_YEAR}-01-12`]: { name: '成人の日', type: 'holiday', hasClass: false },
        [`${NEXT_YEAR}-02-11`]: { name: '建国記念日', type: 'holiday', hasClass: false }
    },
    special: {
        [`${YEAR}-07-24`]: { name: '集中補講', type: 'special' },
        [`${YEAR}-07-25`]: { name: '集中補講', type: 'special' },
        [`${YEAR}-08-03`]: { name: '試験予備', type: 'exam' },
        [`${YEAR}-08-06`]: { name: '試験予備', type: 'exam' },
        [`${YEAR}-08-22`]: { name: '追試', type: 'exam' },
        [`${YEAR}-08-23`]: { name: '追試', type: 'exam' },
        [`${YEAR}-08-25`]: { name: '追試', type: 'exam' },
        [`${NEXT_YEAR}-01-14`]: { name: '集中補講', type: 'special' },
        [`${NEXT_YEAR}-01-15`]: { name: '集中補講', type: 'special' },
        [`${NEXT_YEAR}-01-27`]: { name: '試験予備', type: 'exam' },
        [`${NEXT_YEAR}-02-17`]: { name: '追試', type: 'exam' },
        [`${NEXT_YEAR}-02-18`]: { name: '追試', type: 'exam' },
        [`${NEXT_YEAR}-02-19`]: { name: '追試', type: 'exam' }
    },
    exams: {
        first: {
            start: `${YEAR}-07-30`,
            end: `${YEAR}-08-05`,
            dates: [
                `${YEAR}-07-30`, `${YEAR}-07-31`,
                `${YEAR}-08-01`, `${YEAR}-08-02`,
                `${YEAR}-08-04`, `${YEAR}-08-05`
            ]
        },
        second: {
            start: `${NEXT_YEAR}-01-20`,
            end: `${NEXT_YEAR}-01-27`,
            dates: [
                `${NEXT_YEAR}-01-20`, `${NEXT_YEAR}-01-21`, `${NEXT_YEAR}-01-22`,
                `${NEXT_YEAR}-01-23`, `${NEXT_YEAR}-01-24`, `${NEXT_YEAR}-01-26`
            ]
        }
    }
};

// 講時の時間設定
const PERIOD_TIMES = {
    1: { start: '0915', end: '1045' },
    2: { start: '1100', end: '1230' },
    3: { start: '1330', end: '1500' },
    4: { start: '1515', end: '1645' },
    5: { start: '1700', end: '1830' },
    6: { start: '1845', end: '2000' },
    7: { start: '2015', end: '2145' }
};

// ユーティリティ関数
function compareDates(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() - d2.getTime();
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function toCircledNumber(num) {
    const circledNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'];
    return circledNumbers[num - 1] || '';
}

function formatICSDate(date, isUTC = false) {
    const getDatePart = (d, utc = false) => ({
        year: utc ? d.getUTCFullYear() : d.getFullYear(),
        month: utc ? d.getUTCMonth() + 1 : d.getMonth() + 1,
        day: utc ? d.getUTCDate() : d.getDate(),
        hours: utc ? d.getUTCHours() : d.getHours(),
        minutes: utc ? d.getUTCMinutes() : d.getMinutes(),
        seconds: utc ? d.getUTCSeconds() : d.getSeconds()
    });

    const parts = getDatePart(date, isUTC);
    const format = num => String(num).padStart(2, '0');

    return `${parts.year}${format(parts.month)}${format(parts.day)}T${format(parts.hours)}${format(parts.minutes)}${format(parts.seconds)}${isUTC ? 'Z' : ''}`;
}

// 期間判定関数
function isInFirstSemester(dateObj) {
    return compareDates(dateObj, ACADEMIC_YEAR.FIRST_SEMESTER.start) >= 0 &&
        compareDates(dateObj, EVENTS.exams.first.end) <= 0;
}

function isInSecondSemester(dateObj) {
    return compareDates(dateObj, ACADEMIC_YEAR.SECOND_SEMESTER.start) >= 0 &&
        compareDates(dateObj, EVENTS.exams.second.end) <= 0;
}

// カレンダー関連の関数
function countClassesBefore(dateStr, dayOfWeek, startDateStr, endDateStr) {
    const date = new Date(dateStr);
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (compareDates(date, startDate) < 0 || compareDates(date, endDate) > 0) {
        return 0;
    }

    let count = 0;
    let currentDate = new Date(startDate);

    while (compareDates(currentDate, date) <= 0) {
        const currentDateStr = formatDate(currentDate);
        if (currentDate.getDay() === dayOfWeek) {
            // 特別授業日の処理
            const specialDay = SPECIAL_CLASS_DAYS[currentDateStr];
            if (specialDay?.skipFridayCount && dayOfWeek === 5) {
                currentDate.setDate(currentDate.getDate() + 1);
                continue;
            }

            const holiday = EVENTS.holidays[currentDateStr];
            const special = EVENTS.special[currentDateStr];
            // 授業実施日のみカウント（休日でも hasClass: true ならカウント）
            if ((!holiday && !special) ||
                (holiday && holiday.hasClass) ||
                (special && special.type === 'exam')) {
                count++;
            }
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // 土曜日の回数調整
    if (dayOfWeek === 6 && dateStr !== SPECIAL_DATES.SATURDAY_ADJUSTMENT &&
        compareDates(date, new Date(SPECIAL_DATES.SATURDAY_ADJUSTMENT)) > 0) {
        count++;
    }

    return count;
}

function generateCalendarData() {
    const calendarData = [];
    const startDate = new Date(YEAR, 3, 1); // 2025-04-01
    const endDate = new Date(NEXT_YEAR, 2, 31);  // 2026-03-31

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateStr = formatDate(date);
        const dayOfWeek = date.getDay();
        const isFirstSemester = isInFirstSemester(date);
        const isSecondSemester = isInSecondSemester(date);

        const dayData = {
            date: dateStr,
            event: '',
            classNumber: 0,    // 前期 or 後期 全体での「第○回」
            quarterNumber: 0,  // 1Q〜4Q いずれかの「第○回」
            type: '',
            prefix: ''
        };

        // 試験期間の判定
        const isExamDay = EVENTS.exams.first.dates.includes(dateStr) ||
            EVENTS.exams.second.dates.includes(dateStr);

        // 特別授業日の処理
        const specialClassDay = SPECIAL_CLASS_DAYS[dateStr];
        if (specialClassDay) {
            dayData.classNumber = specialClassDay.classNumber;
            dayData.quarterNumber = specialClassDay.quarterNumber;
            dayData.prefix = specialClassDay.prefix || '';
        }
        // 休日・特別・試験
        else if (EVENTS.holidays[dateStr]) {
            const holiday = EVENTS.holidays[dateStr];
            dayData.type = holiday.type;
            if (!holiday.hasClass) {
                dayData.event = holiday.name;
            }
        } else if (EVENTS.special[dateStr]) {
            dayData.event = EVENTS.special[dateStr].name;
            dayData.type = EVENTS.special[dateStr].type;
        } else if (isExamDay) {
            dayData.event = '試験期間';
            dayData.type = 'exam';
        }

        // 通常の授業日の処理
        if (!specialClassDay && dayOfWeek !== 0 && (isFirstSemester || isSecondSemester)) {
            if (!EVENTS.special[dateStr]) {
                const holiday = EVENTS.holidays[dateStr];
                if (!holiday || holiday.hasClass) {
                    const semesterStart = isFirstSemester
                        ? ACADEMIC_YEAR.FIRST_SEMESTER.start
                        : ACADEMIC_YEAR.SECOND_SEMESTER.start;
                    const semesterEnd = isFirstSemester
                        ? EVENTS.exams.first.end
                        : EVENTS.exams.second.end;
                    dayData.classNumber = countClassesBefore(dateStr, dayOfWeek,
                        semesterStart, semesterEnd
                    );
                    if (dayData.classNumber > 0) {
                        // 1セメスター最大8回想定 → (classNumber-1)%8 +1 で1〜8を算出
                        dayData.quarterNumber = (dayData.classNumber - 1) % 8 + 1;
                    }
                }
            }
        }
        calendarData.push([
            dayData.date,          // [0]
            dayData.event,         // [1]
            dayData.classNumber,   // [2] (学期での回数)
            dayData.quarterNumber, // [3] (クォーター内での回数)
            dayData.type,          // [4]
            dayData.prefix         // [5]
        ]);
    }

    return calendarData;
}

function renderCalendar() {
    const calendarData = generateCalendarData();
    globalCalendarData = calendarData;
    const calendar = document.getElementById('calendar');
    const monthsHtml = [];

    // 4月(4)〜翌年3月(15) → (13,14,15 は 翌年の1,2,3月)
    for (let month = 4; month <= 15; month++) {
        const actualMonth = month > 12 ? month - 12 : month;
        const year = month > 12 ? NEXT_YEAR : YEAR;
        const firstDay = new Date(year, actualMonth - 1, 1);
        const lastDay = new Date(year, actualMonth, 0);
        const daysInMonth = lastDay.getDate();

        let monthHtml = `
            <div class="month-card">
                <h3 class="month-title">${actualMonth}月</h3>
                <div class="calendar-grid">
                    <div class="weekday">日</div>
                    <div class="weekday">月</div>
                    <div class="weekday">火</div>
                    <div class="weekday">水</div>
                    <div class="weekday">木</div>
                    <div class="weekday">金</div>
                    <div class="weekday">土</div>
        `;

        // 月初めの空白
        for (let i = 0; i < firstDay.getDay(); i++) {
            monthHtml += '<div class="day-cell"></div>';
        }

        // 日付セル
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${String(actualMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayData = calendarData.find(d => d[0] === date) || [date, '', 0, 0, '', ''];
            const dayOfWeek = new Date(date).getDay();

            monthHtml += `
                <div class="day-cell">
                    <div class="date${dayOfWeek === 0 || dayData[4] === 'holiday' ? ' holiday' : ''}">
                        ${day}
                    </div>
            `;

            if (dayData[1]) {
                monthHtml += `<div class="event ${dayData[4]}">${dayData[1]}</div>`;
            }

            // 5講時以降の特別授業日
            const specialPeriodDay = SPECIAL_PERIOD_DAYS[date];
            if (specialPeriodDay) {
                monthHtml += `<div class="event special">${specialPeriodDay.note}</div>`;
            }

            // 授業回数表示（試験期間中はセメスター科目の回数のみ非表示）
            if (dayData[2] > 0 || dayData[3] > 0) {
                monthHtml += `
                    <div class="class-numbers">
                        ${dayData[4] !== 'exam' && dayData[2] > 0 ? `<span class="number">${dayData[5] || ''}${dayData[2]}</span>` : ''}
                        ${dayData[3] > 0 ? `<span class="quarter">${dayData[5] || ''}${toCircledNumber(dayData[3])}</span>` : ''}
                    </div>
                `;
            }

            monthHtml += '</div>';
        }

        // 月末の空白
        const lastDayOfWeek = lastDay.getDay();
        for (let i = lastDayOfWeek; i < 6; i++) {
            monthHtml += '<div class="day-cell"></div>';
        }

        monthHtml += '</div></div>';
        monthsHtml.push(monthHtml);
    }

    calendar.innerHTML = `<div class="months-grid">${monthsHtml.join('')}</div>`;
}

// モーダル表示制御
const openModalBtn = document.getElementById('open-ics-modal');
const modalOverlay = document.getElementById('ics-modal');
const closeModalBtn = document.getElementById('close-ics-modal');
const createIcsBtn = document.getElementById('create-ics-file');
const confirmListDiv = document.getElementById('confirm-list');

const semesterSelect = document.getElementById('semester-select');
const weekdaySelect = document.getElementById('weekday-select');
const subjectNameInput = document.getElementById('subject-name');

// 講時のチェックボックスを取得する関数
function getSelectedPeriods() {
    const periods = [];
    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`period-${i}`);
        if (checkbox && checkbox.checked) {
            periods.push(i);
        }
    }
    return periods;
}

openModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    resetModal();
});

// 何か変更されたらリストを更新
[semesterSelect, weekdaySelect].forEach(el => {
    el.addEventListener('change', updateConfirmList);
});

// チェックボックスの変更イベントを追加
for (let i = 1; i <= 7; i++) {
    const checkbox = document.getElementById(`period-${i}`);
    if (checkbox) {
        checkbox.addEventListener('change', updateConfirmList);
    }
}

// 科目名の入力中もリアルタイムで更新するためのイベントを追加
subjectNameInput.addEventListener('input', updateConfirmList);

function updateConfirmList() {
    const semesterValue = semesterSelect.value;
    const weekdayValue = parseInt(weekdaySelect.value, 10);
    const selectedPeriods = getSelectedPeriods();

    // 学期、曜日、講時のいずれかが未選択の場合は非表示
    // 科目名は入力中でもOKボタンを表示
    if (!semesterValue || isNaN(weekdayValue) || selectedPeriods.length === 0) {
        confirmListDiv.classList.add('hidden');
        createIcsBtn.classList.add('hidden');
        return;
    }

    // 条件に合う日付を抽出
    const filteredData = filterCalendarData(semesterValue, weekdayValue);

    if (!filteredData.length) {
        confirmListDiv.innerHTML = '<p>該当する日がありません。</p>';
        confirmListDiv.classList.remove('hidden');
        createIcsBtn.classList.add('hidden');
    } else {
        const periodTexts = selectedPeriods.map(p => `${p}講時`).join('・');
        confirmListDiv.innerHTML = filteredData.map(d => {
            const displayNumber = (semesterValue === '前期' || semesterValue === '後期')
                ? `${d[2]}回`
                : `${d[3]}回`;
            return `<div>${d[0]} (${displayNumber}) ${periodTexts}</div>`;
        }).join('');
        confirmListDiv.classList.remove('hidden');
        createIcsBtn.classList.remove('hidden');
    }
}

// OKボタン
createIcsBtn.addEventListener('click', () => {
    const subjectName = subjectNameInput.value.trim();
    const semesterValue = semesterSelect.value;
    const weekdayValue = parseInt(weekdaySelect.value, 10);
    const selectedPeriods = getSelectedPeriods();

    const filteredData = filterCalendarData(semesterValue, weekdayValue);
    if (!filteredData.length) {
        alert('該当する日がありません。');
        return;
    }

    // ICS文字列生成（複数講時対応）
    const icsContent = generateICS(subjectName, filteredData, semesterValue, selectedPeriods);
    // ダウンロード
    downloadICS(icsContent, `${subjectName}_${semesterValue}.ics`);

    // モーダルを閉じてリセット
    modalOverlay.style.display = 'none';
    resetModal();
});

function generateICS(subjectName, dataList, semesterValue, periods) {
    const now = new Date();
    const dtStamp = formatICSDate(now, true);
    const events = [];

    dataList.forEach(d => {
        const [dateStr, , classNumber, qNumber] = d;
        const nth = (semesterValue === '前期' || semesterValue === '後期')
            ? classNumber
            : (semesterValue === '1Q' || semesterValue === '3Q')
                ? classNumber
                : classNumber - 8;

        // 各講時ごとにイベントを生成
        periods.forEach(periodValue => {
            const startTime = PERIOD_TIMES[periodValue].start;
            const endTime = PERIOD_TIMES[periodValue].end;
            const dtStart = dateStr.replace(/-/g, '') + 'T' + startTime + '00';
            const dtEnd = dateStr.replace(/-/g, '') + 'T' + endTime + '00';

            const event = [
                'BEGIN:VEVENT',
                `DTSTAMP:${dtStamp}`,
                `UID:${subjectName}-${dateStr}-${periodValue}@example.com`,
                `DTSTART:${dtStart}`,
                `DTEND:${dtEnd}`,
                `SUMMARY:${subjectName} 第${nth}回`,
                'END:VEVENT'
            ].join('\r\n');
            events.push(event);
        });
    });

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        ...events,
        'END:VCALENDAR'
    ].join('\r\n');
}

// ICSファイル関連の関数
function downloadICS(icsData, fileName) {
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), {
        href: url,
        download: fileName
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// モーダル関連の関数
function resetModal() {
    Object.assign(subjectNameInput, { value: '' });
    Object.assign(semesterSelect, { value: '前期' });
    Object.assign(weekdaySelect, { value: '1' });
    // チェックボックスをすべて解除
    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`period-${i}`);
        if (checkbox) {
            checkbox.checked = false;
        }
    }
    Object.assign(confirmListDiv, { innerHTML: '' });
    confirmListDiv.classList.add('hidden');
    createIcsBtn.classList.add('hidden');
}

// 学期 + 曜日 でフィルタ
function filterCalendarData(semesterValue, weekdayValue) {
    const result = [];
    globalCalendarData.forEach(d => {
        const dateStr = d[0];
        const classNumber = d[2];
        const dateObj = new Date(dateStr);
        const dayOfWeek = dateObj.getDay();

        // 授業日 (classNumber > 0) のみ
        if (classNumber <= 0) return;

        // 特別授業日の判定
        const specialDay = SPECIAL_CLASS_DAYS[dateStr];
        // 金曜日として選択された場合はスキップ
        if (specialDay?.skipFridayCount && dayOfWeek === 5 && weekdayValue === 5) return;

        // 曜日判定用の値を設定（12/26は土曜日として扱う）
        const effectiveDayOfWeek = (specialDay?.skipFridayCount && dayOfWeek === 5) ? 6 : dayOfWeek;

        // 学期判定
        const isFirstSemester = isInFirstSemester(dateObj);
        const isSecondSemester = isInSecondSemester(dateObj);

        let passSemester = false;
        switch (semesterValue) {
            case '前期':
                passSemester = isFirstSemester && classNumber <= 15;
                break;
            case '後期':
                passSemester = isSecondSemester && classNumber <= 15;
                break;
            case '1Q':
                passSemester = isFirstSemester && classNumber >= 1 && classNumber <= 8;
                break;
            case '2Q':
                passSemester = isFirstSemester && classNumber >= 9 && classNumber <= 16;
                break;
            case '3Q':
                passSemester = isSecondSemester && classNumber >= 1 && classNumber <= 8;
                break;
            case '4Q':
                passSemester = isSecondSemester && classNumber >= 9 && classNumber <= 16;
                break;
        }

        // 曜日判定
        const passWeekday = (effectiveDayOfWeek === weekdayValue);

        if (passSemester && passWeekday) {
            result.push(d);
        }
    });
    return result;
}

// DOM読み込み後、タイトルを設定しカレンダーを描画
document.addEventListener('DOMContentLoaded', () => {
    // タイトルを設定
    document.title = `${YEAR}年度 学年歴【瀬田学舎】`;
    document.querySelector('.title').textContent = `${YEAR}年度 学年歴【瀬田学舎】`;
    // カレンダーを描画
    renderCalendar();
}); 