
// ReactDOM.render(
//     React.createElement(MainContainer, null,
//         React.createElement(ClosedQuestion, {
//             name: 'question1',
//             answers: ['ans1', 'ans2', 'ans3', 'ans4', 'ans5']
//         })
//     ),
//     document.getElementById('root')
// );

ReactDOM.render(
    React.createElement(MainContainer, null,
        React.createElement('form', null,
            React.createElement(ClosedQuestion, {
                name: 'year',
                answers: ['2019', '1825', '2020', '2077'],
                correctAnswer: 2
            }, 'מה השנה עכשיו?'), React.createElement(ClosedQuestion, {
                name: 'language',
                answers: ['יהודית', 'אנגלית', 'יידיש', 'עברית'],
                correctAnswer: 3
            }, 'איזו שפה מדברים בישראל?'), 
        )       
    ),
    document.getElementById('root')
);
