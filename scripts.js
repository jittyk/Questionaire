 $(document).ready(function () {
              let currentQuestionIndex = 0;
              let score = 0;
              let selectedSubject = null;
              let questions = [];
              let answeredQuestions = [];
            
              $.getJSON('questions.json', function (data) {
                  const subjects = data.subjects;
            
                  if (subjects.length === 0) {
                      $("#homeScreen .row").append(`
                          <div class="col-12" style="padding:10px;">
                              <h2 class="text-danger text-center">No Subjects Available!!</h2>
                          </div>
                      `);
                  } else {
                      subjects.forEach(subject => {
                          $("#homeScreen .row").append(`
                              <div class="col-md-6 btn-container">
                                  <button class="custom-btn subject-btn" data-subject-id="${subject.subject_id}">${subject.subject_name}</button>
                              </div>
                          `);
                      });
            $(document).ready(function () {
            // Apply styles dynamically using jQuery
            $("html, body").css({
              "height": "100%",
              "margin": "0"
            });
            
            $("body").css({
              "padding": "0px",
              "margin": "0px",
              "font-family": "Verdana, sans-serif",
              "background-color": "white",
              "display": "flex",
              "flex-direction": "column"
            });
            
            $("header, footer").css({
              "background-color": "#4682b4",
              "color": "white",
              "padding": "10px 0",
              "text-align": "center"
            });
            
            $(".custom-btn").css({
              "display": "inline-block",
              "padding": "15px 30px",
              "font-size": "1.5rem",
              "font-weight": "bold",
              "color": "white",
              "text-align": "center",
              "text-decoration": "none",
              "border-radius": "50px",
              "background": "linear-gradient(to right, #0623a1, #53a9f5)",
              "box-shadow": "0 5px 15px rgba(0, 0, 0, 0.2)",
              "transition": "transform 0.2s ease",
              "width": "100%"
            });
            
            $(".custom-btn").hover(
              function () {
                  $(this).css("transform", "scale(1.05)");
              },
              function () {
                  $(this).css("transform", "scale(1)");
              }
            );
            
            $(".btn-container").css({
              "margin-bottom": "20px"
            });
            
            $(".question-section, .result-section").css({
              "display": "none"
            });
            
            $("#percentageText").css({
              "font-weight": "bold"
            });
            });
            
                      // Subject button click event
                      $(".subject-btn").click(function () {
                          const subjectId = $(this).data("subject-id");
                          selectedSubject = subjects.find(sub => sub.subject_id === subjectId);
                          questions = selectedSubject.mcqs;
            
                          if (questions.length === 0) {
                              $("#homeScreen").hide();
                              $("#testScreen").hide();
                              $("#resultScreen").hide();
                              $("#homeScreen .row").append(`
                                  <div class="col-12">
                                      <p class="text-danger text-center">No Questions Available</p>
                                  </div>
                              `);
                              $("#homeScreen").show();
                          } else {
                              $("#homeScreen").hide();
                              $("#testScreen").show();
                              loadQuestion();
                          }
                      });
                  }
              });
            
              $("#saveAnswerBtn").click(function() {
                  const selectedOptionBtn = $("#optionsContainer .btn-primary");
                  const selectedOption = selectedOptionBtn.data("value");
            
                  if (selectedOption) {
                      if (!answeredQuestions.includes(currentQuestionIndex)) {
                          const correctAnswer = questions[currentQuestionIndex].correct_answer;
                          const feedbackMessage = $("<span class='feedback-message'></span>");
            
                          $(".feedback-message").remove();
            
                          if (String(selectedOption) === String(correctAnswer)) {
                              score++;
                              feedbackMessage.text("Correct!").css("color", "green");
                          } else {
                              feedbackMessage.text("Incorrect!").css("color", "red");
                          }
            
                          feedbackMessage.css({
                              "margin-left": "10px",
                              "display": "inline-block",
                              "vertical-align": "middle"
                          });
            
                          selectedOptionBtn.after(feedbackMessage);
            
                          answeredQuestions.push(currentQuestionIndex);
                      } else {
                          alert("You have already answered this question.");
                      }
            
                      $("#nextBtn").prop("disabled", false); // Enable the Next button after saving the answer
                  } else {
                      alert("Please select an option.");
                  }
              });
            
              $("#nextBtn").click(function () {
                  currentQuestionIndex++;
                  if (currentQuestionIndex < questions.length) {
                      loadQuestion();
                  } else {
                      showResult();
                  }
              });
            
              $("#prevBtn").click(function () {
                  if (currentQuestionIndex > 0) {
                      currentQuestionIndex--;
                      loadQuestion();
                  }
              });
            
              $("#restartQuizBtn").click(function() {
                  currentQuestionIndex = 0;
                  score = 0;
                  answeredQuestions = []; // Reset answered questions
                  $("#resultScreen").hide();
                  $("#testScreen").show();
                  loadQuestion();
              });
            
              $(".homeButton").click(function () {
                  // Reset quiz state
                  currentQuestionIndex = 0;
                  score = 0;
                  questions = [];
                  answeredQuestions = [];
                  selectedSubject = null;
                  
                  // Hide test and result screens, show home screen
                  $("#testScreen").hide();
                  $("#resultScreen").hide();
                  $("#homeScreen").show();
              });
              
              function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    $("#currentQuestion").text(currentQuestionIndex + 1);
    $("#totalQuestions").text(questions.length);
    $("#questionText").text(questionData.question);
    $("#optionsContainer").empty();

    questionData.options.forEach(option => {
        $("#optionsContainer").append(`
            <button class="btn btn-outline-primary option-btn w-100 my-2" data-value="${option}">${option}</button>
        `);
    });

    $("#nextBtn").prop("disabled", true); // Disable the Next button initially
    $("#prevBtn").prop("disabled", currentQuestionIndex === 0);

    // Change the Next button text to "Submit" if it's the last question
    if (currentQuestionIndex === questions.length - 1) {
        $("#nextBtn").text("Submit");
    } else {
        $("#nextBtn").text("Next");
    }

    $(".option-btn").click(function () {
        $(".option-btn").removeClass("btn-primary").addClass("btn-outline-primary");
        $(this).removeClass("btn-outline-primary").addClass("btn-primary");
        $("#nextBtn").prop("disabled", false); // Enable the Next button when an option is selected
    });
}

            
              function showResult() {
            const totalQuestions = questions.length;
            const percentage = Math.round((score / totalQuestions) * 100);
            
            $("#testScreen").hide();
            $("#resultScreen").show();
            
            
            document.documentElement.style.setProperty('--percentage', `${percentage * 3.6}deg`);
            $("#percentageText").text(`${percentage}%`);
            
            // Display score
            $("#finalScore").text(score);
            $("#totalQuestions").text(totalQuestions);
            }
            
            
              $("#homeScreen").show();
              $("#testScreen").hide();
              $("#resultScreen").hide();
            });