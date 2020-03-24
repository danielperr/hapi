
// ReactDOM.render(
//     React.createElement(MainContainer, null,
//         React.createElement(ClosedQuestion, {
//             name: 'question1',
//             answers: ['ans1', 'ans2', 'ans3', 'ans4', 'ans5']
//         })
//     ),
//     document.getElementById('root')
// );

/*
React.createElement(Question, open, ques1args)
React.createElement(Label, args)
React.createElement(Embed, args)
React.createElement(Section, args)
React.createElement()
*/

ques1args = {
    name: 'year',
    question: 'מה השנה עכשיו?',
    answers: ['2019', '1825', '2020', '2077'],
    correctAnswer: 0,
}

ques2args = {
    name: 'language',
    question: 'איזו שפה מדברים בישראל?',
    answers: ['יהודית', 'אנגלית', 'יידיש', 'עברית'],
    correctAnswer: 3,
}

ques3args = {
    name: 'ball',
    question: 'העתיקו את הקוד הראשון (בצד שמאל מתחת לחלון code1, ראו תמונה מצורפת) והריצו אותו. מה קרה?',
    answers: ['2019', '1825', '2020', '2077'],
    correctAnswer: 2,
}

ques4args = {
    name: 'language',
    question: 'הריצו את התא שוב ושוב. מה קורה?',
    answers: ['יהודית', 'אנגלית', 'יידיש', 'עברית'],
    correctAnswer: 3,
}

ques5args = {
    name: 'language',
    question: 'העתיקו את הקוד השני (בצד שמאל מתחת לחלון code2, ראו תמונה מצורפת). והריצו אותו שוב ושוב. מה קורה?',
    answers: ['יהודית', 'אנגלית', 'יידיש', 'עברית'],
    correctAnswer: 2,
}

ReactDOM.render(
    React.createElement(MainContainer, null,
        React.createElement('form', null,
            React.createElement(YoutubeEmbed), 
            React.createElement(ClosedQuestion, ques1args), 
            React.createElement(ClosedQuestion, ques2args),
            React.createElement(IfigureEmbed),
            React.createElement(ClosedQuestion, ques3args), 
            React.createElement(ClosedQuestion, ques4args), 
            React.createElement(ClosedQuestion, ques5args), 
        )       
    ), document.getElementById('root')
);
