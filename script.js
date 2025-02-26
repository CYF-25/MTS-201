document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const homePage = document.getElementById("home-page");
    const instructionsPage = document.getElementById("instructions-page");
    const testPage = document.getElementById("test-page");
    const reviewPage = document.createElement("div");
    const userMatric = document.getElementById("user-matric");
    const userMatricTest = document.getElementById("user-matric-test");
    const startTestBtn = document.getElementById("start-test");
    const questionText = document.getElementById("question-text");
    const optionsDiv = document.getElementById("options");
    const questionIconsDiv = document.getElementById("question-icons");
    const saveButton = document.getElementById("save");
    const submitButton = document.getElementById("submit-test");
    const timerDisplay = document.createElement("div");

    let currentQuestion = 1;
    const totalQuestions = 30;
    let timeLeft = 30 * 60;
    let timerInterval;
    const answers = {};
    let selectedQuestions = [];

    const allQuestions = [
        { 
            // real-valued functions of real variables
            type: "mcq", 
            question: "If f(x) = x² + 3x - 5, what is f(2)?", 
            options: ["A) 5", "B) 6", "C) 7", "D) 8"], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following functions is NOT continuous for all real values of x?", 
            options: ["A) f(x) = x³ - 2x + 1", "B) g(x) = 1/(x-2)", "C) h(x) = e^x", "D) k(x) = sin x"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "If f(x) = sin x, then f(x) is:", 
            options: ["A) Odd function", "B) Even function", "C) Neither odd nor even", "D) Periodic with period π"], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "The domain of the function f(x) = √(4 - x²) is:", 
            options: ["A) (-∞, ∞)", "B) (-2,2)", "C) [-2,2]", "D) (-∞, 2]"], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "If f(x) = e^x, which of the following is true?", 
            options: ["A) f(x) is bounded above", "B) f(x) is bounded below", "C) f(x) has a maximum value", "D) f(x) is periodic"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is the correct definition of a real-valued function?", 
            options: ["A) A function that takes real values as inputs", "B) A function that maps a real number to a complex number", "C) A function that maps a real number to another real number", "D) A function defined only on natural numbers"], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "The function f(x) = |x| is:", 
            options: ["A) Continuous but not differentiable at x = 0", "B) Differentiable everywhere", "C) Discontinuous at x = 0", "D) A quadratic function"], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "The range of f(x) = cos x is:", 
            options: ["A) (-∞, ∞)", "B) [0,1]", "C) [-1,1]", "D) (-1,1)"], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "If f(x) = x³, which of the following is true?", 
            options: ["A) f(x) is an even function", "B) f(x) is an odd function", "C) f(x) is neither even nor odd", "D) f(x) is periodic"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "The function f(x) = 1/x is discontinuous at:", 
            options: ["A) x = 0", "B) x = 1", "C) x = -1", "D) x = 2"], 
            answer: "A" 
        },

        { 
            type: "mcq", 
            question: "For which values of x is the function f(x) = √(x - 1) defined?", 
            options: [
                "A) x > 1", 
                "B) x ≥ 1", 
                "C) x > 0", 
                "D) all x ∈ ℝ"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "If f(x) = ln(x), what is the domain of f(x)?", 
            options: [
                "A) x > 0", 
                "B) x ≥ 0", 
                "C) x < 0", 
                "D) all x ∈ ℝ"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following functions is NOT one-to-one?", 
            options: [
                "A) f(x) = x³", 
                "B) f(x) = e^x", 
                "C) f(x) = x²", 
                "D) f(x) = ln(x)"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which function has a horizontal asymptote as x → ∞?", 
            options: [
                "A) f(x) = x", 
                "B) f(x) = sin x", 
                "C) f(x) = e^x", 
                "D) f(x) = arctan x"
            ], 
            answer: "D" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = |x|, which statement is true?", 
            options: [
                "A) f(x) is differentiable everywhere", 
                "B) f(x) is continuous everywhere but not differentiable at x = 0", 
                "C) f(x) is discontinuous at x = 0", 
                "D) f(x) is neither continuous nor differentiable at x = 0"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "For the function f(x) = 1/(1 + x²), what is the range?", 
            options: [
                "A) (-∞, ∞)\-1,1", 
                "B) [0,1]", 
                "C) (0,1]", 
                "D) [-1,1]"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Consider f(x) = x/(1 + |x|). What is the range of f(x)?", 
            options: [
                "A) (-1, 1)", 
                "B) [-1, 1]", 
                "C) (-1, 1]", 
                "D) [0, 1)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "If f(x) = sin²(x), what is the period of f(x)?", 
            options: [
                "A) 2π", 
                "B) π", 
                "C) π/2", 
                "D) 4π"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "For the function f(x) = 1/(x - 1), where is the vertical asymptote located?", 
            options: [
                "A) x = 1", 
                "B) x = 0", 
                "C) x = -1", 
                "D) None of the above"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "If f(x) = e^(–x²), what is the maximum value of f(x)?", 
            options: [
                "A) e", 
                "B) 0", 
                "C) 1", 
                "D) ∞"
            ], 
            answer: "C" 
        },

        // limits and continuity
        { 
            type: "mcq", 
            question: "Evaluate limₓ→2 (x² - 4)/(x - 2).", 
            options: ["A) 4", "B) 2", "C) 0", "D) Undefined"], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Find limₓ→0 (sin x)/x.", 
            options: ["A) 0", "B) 1", "C) Undefined", "D) Does not exist"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Find limₓ→∞ 1/x.", 
            options: ["A) 1", "B) 0", "C) ∞", "D) Does not exist"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Evaluate limₓ→0 (1 - cos x)/x².", 
            options: ["A) 0", "B) 1/2", "C) 1", "D) 2"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Determine the continuity of f(x) = 1/x at x = 0.", 
            options: ["A) Continuous everywhere", "B) Discontinuous at x = 0", "C) Continuous for x ≠ 0", "D) Continuous only at x = 0"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the definition of continuity at a point x = c?", 
            options: [
                "A) limₓ→c f(x) exists and equals f(c)", 
                "B) f(x) is differentiable at c", 
                "C) f(c) exists even if the limit does not", 
                "D) f(x) is bounded near c"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following functions is discontinuous at x = 0?", 
            options: [
                "A) f(x) = sin x", 
                "B) f(x) = 1/x", 
                "C) f(x) = x²", 
                "D) f(x) = |x|"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "For which values of x is f(x) = √(x - 3) continuous?", 
            options: [
                "A) x ≥ 3", 
                "B) x > 3", 
                "C) x ≤ 3", 
                "D) All x ∈ ℝ"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Evaluate limₓ→-∞ (2x + 3)/(x - 4).", 
            options: ["A) 2", "B) -2", "C) 0", "D) 1"], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Find limₓ→0 (tan x)/x.", 
            options: ["A) 0", "B) 1", "C) Undefined", "D) Does not exist"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Determine if f(x) = x² is continuous at x = 3.", 
            options: [
                "A) Continuous", 
                "B) Discontinuous", 
                "C) Not defined at x = 3", 
                "D) Continuous only for integer values"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Find limₓ→0 (eˣ - 1)/x.", 
            options: ["A) 0", "B) 1", "C) e", "D) Undefined"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Evaluate limₓ→0 |x|/x.", 
            options: ["A) 1", "B) -1", "C) 0", "D) Does not exist"], 
            answer: "D" 
        },
        { 
            type: "mcq", 
            question: "Is f(x) = |x| continuous at x = 0?", 
            options: ["A) Yes", "B) No", "C) Only from the right", "D) Only from the left"], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Find limₓ→0⁺ ln x.", 
            options: ["A) ∞", "B) -∞", "C) 0", "D) 1"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Determine the type of discontinuity of f(x) = (x² - 1)/(x - 1) at x = 1.", 
            options: [
                "A) Jump discontinuity", 
                "B) Essential discontinuity", 
                "C) Removable discontinuity", 
                "D) Infinite discontinuity"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Evaluate limₓ→1 (x³ - 1)/(x - 1).", 
            options: ["A) 1", "B) 2", "C) 3", "D) 0"], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Compute limₓ→0 (sin 3x)/x.", 
            options: ["A) 1", "B) 3", "C) 0", "D) 3/2"], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is a necessary condition for a function to be continuous on an interval?", 
            options: [
                "A) It must be defined at every point in the interval", 
                "B) It must be differentiable on the interval", 
                "C) It must be integrable on the interval", 
                "D) It must be bounded on the interval"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Evaluate limₓ→0 (1 - e^(–x))/x.", 
            options: ["A) 0", "B) 1", "C) -1", "D) Undefined"], 
            answer: "B" 
        },

        //Taylor Series and Maclaurin Expansion
        { 
            type: "mcq", 
            question: "Which of the following is the Maclaurin series for e^x?", 
            options: [
                "A) 1 + x + x²/2! + x³/3! + …", 
                "B) 1 + x + 2x² + 6x³ + …", 
                "C) 1 + x + x²/2 + x³/3 + …", 
                "D) 1 + x²/2! + x⁴/4! + …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is the Maclaurin series expansion for sin x?", 
            options: [
                "A) x – x³/3! + x⁵/5! – x⁷/7! + …", 
                "B) x + x³/3! + x⁵/5! + …", 
                "C) 1 – x²/2! + x⁴/4! – …", 
                "D) x² – x⁴/4! + x⁶/6! – …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is the Maclaurin series expansion for cos x?", 
            options: [
                "A) 1 – x²/2! + x⁴/4! – x⁶/6! + …", 
                "B) x – x³/3! + x⁵/5! – …", 
                "C) 1 + x + x²/2! + x³/3! + …", 
                "D) x² – x⁴/4! + x⁶/6! – …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the Maclaurin series for ln(1+x) (for |x| < 1)?", 
            options: [
                "A) x – x²/2 + x³/3 – x⁴/4 + …", 
                "B) x + x²/2 + x³/3 + x⁴/4 + …", 
                "C) 1 + x + x²/2 + x³/3 + …", 
                "D) x – x² + x³ – x⁴ + …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Find the Maclaurin series expansion for arctan x (for |x| ≤ 1).", 
            options: [
                "A) x – x³/3 + x⁵/5 – x⁷/7 + …", 
                "B) x + x³/3 + x⁵/5 + …", 
                "C) x – x²/2 + x³/3 – x⁴/4 + …", 
                "D) x – x³/3! + x⁵/5! – …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the radius of convergence of the Maclaurin series for ln(1+x)?", 
            options: [
                "A) 1", 
                "B) ∞", 
                "C) 0", 
                "D) 1/2"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "In the Maclaurin series for e^x: 1 + x + x²/2! + ___ + x⁴/4! + …, which term is missing?", 
            options: [
                "A) x³/3!", 
                "B) x⁵/5!", 
                "C) x⁶/6!", 
                "D) No term is missing"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the general Maclaurin series expansion for (1+x)^n (for any real n)?", 
            options: [
                "A) 1 + nx + n(n–1)x²/2! + n(n–1)(n–2)x³/3! + …", 
                "B) 1 + nx + n²x²/2! + n³x³/3! + …", 
                "C) 1 + x + x² + x³ + …", 
                "D) n + x + n(n–1)x²/2! + …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "If f(x) = e^x, what is the value of the third derivative f'''(0) as given by its Maclaurin series?", 
            options: [
                "A) 0", 
                "B) 1", 
                "C) 6", 
                "D) 3"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following represents the Maclaurin series expansion for sin²x (using the double-angle identity)?", 
            options: [
                "A) x² – x⁴/3 + 2x⁶/45 – …", 
                "B) x – x³/3! + x⁵/5! – …", 
                "C) 1 – x²/2! + x⁴/4! – …", 
                "D) 1 + x²/2 + x⁴/4 + …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the general form of the Taylor series expansion of a function f(x) about x = a?", 
            options: [
                "A) f(x) = Σ [f⁽ⁿ⁾(a)/n!] · (x–a)ⁿ", 
                "B) f(x) = Σ (x–a)ⁿ", 
                "C) f(x) = f(a) + f'(a)(x–a)", 
                "D) f(x) = f(a) + (x–a)f'(x)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = ln x, what is the Taylor series expansion about a = 1 (i.e., for ln x around 1)?", 
            options: [
                "A) ln x = (x–1) – (x–1)²/2 + (x–1)³/3 – …", 
                "B) ln x = (x–1) + (x–1)²/2 + (x–1)³/3 + …", 
                "C) ln x = 1 + (x–1) – (x–1)²/2 + …", 
                "D) ln x = (x–1) – 2(x–1)² + 3(x–1)³ – …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following functions does NOT have a Maclaurin series representation?", 
            options: [
                "A) f(x) = e^x", 
                "B) f(x) = sin x", 
                "C) f(x) = ln x", 
                "D) f(x) = cos x"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Find the Maclaurin series for f(x) = 1/(1–x).", 
            options: [
                "A) 1 + x + x² + x³ + … (for |x| < 1)", 
                "B) 1 – x + x² – x³ + …", 
                "C) 1 + 2x + 3x² + 4x³ + …", 
                "D) 1 + x² + x⁴ + x⁶ + …"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "In a Taylor series, what is the error term (remainder) commonly known as?", 
            options: [
                "A) Lagrange remainder", 
                "B) Newton remainder", 
                "C) Euler remainder", 
                "D) Maclaurin error term"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following best describes the Maclaurin series expansion?", 
            options: [
                "A) A Taylor series expansion about x = 0", 
                "B) A Fourier series expansion", 
                "C) An asymptotic series expansion", 
                "D) A Laurent series expansion"
            ], 
            answer: "A" 
        },

        //Taylor Series and Maclaurin Expansion of Two Variables
        { 
            type: "mcq", 
            question: "What is the general form of the Taylor series expansion for a function f(x,y) about a point (a,b)?", 
            options: [
                "A) f(x,y) = Σₘ₌₀∞ Σₙ₌₀∞ [f^(m,n)(a,b) / (m! n!)] · (x–a)^m (y–b)^n",
                "B) f(x,y) = Σₘ₌₀∞ [f^(m)(a,b) / m!] · (x–a + y–b)^m",
                "C) f(x,y) = f(a,b) + f_x(a,b)(x–a) + f_y(a,b)(y–b)",
                "D) f(x,y) = Σₘ₌₀∞ [f^(m)(a,b)/m!] · (x–a)^m + Σₙ₌₀∞ [f^(n)(a,b)/n!] · (y–b)^n"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the Maclaurin series expansion for a function f(x,y) around (0,0)?", 
            options: [
                "A) f(x,y) = Σₘ₌₀∞ Σₙ₌₀∞ [f^(m,n)(0,0) / (m! n!)] · x^m y^n",
                "B) f(x,y) = f(0,0) + f_x(0,0)x + f_y(0,0)y",
                "C) f(x,y) = Σₘ₌₀∞ [f^(m)(0,0) / m!] · (x+y)^m",
                "D) f(x,y) = Σₘ₌₀∞ [f^(m,n)(0,0)] · x^m y^n"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "In the two‑variable Taylor series, what does the term (∂²f/∂x∂y)(a,b) represent?", 
            options: [
                "A) The mixed second partial derivative at (a,b)",
                "B) The product of the first partial derivatives",
                "C) The second derivative with respect to x only",
                "D) The second derivative with respect to y only"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is the correct second‑order Maclaurin expansion for f(x,y) about (0,0)?", 
            options: [
                "A) f(0,0) + f_x(0,0)x + f_y(0,0)y + (1/2)[f_xx(0,0)x² + 2f_xy(0,0)xy + f_yy(0,0)y²]",
                "B) f(0,0) + f_x(0,0)x + f_y(0,0)y + f_xx(0,0)x² + f_xy(0,0)xy + f_yy(0,0)y²",
                "C) f(0,0) + (1/2)[f_x(0,0)x + f_y(0,0)y] + (1/2)[f_xx(0,0)x² + f_xy(0,0)xy + f_yy(0,0)y²]",
                "D) f(0,0) + f_x(0,0)x + f_y(0,0)y"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x,y) = e^(x+y), what is its Maclaurin series expansion?", 
            options: [
                "A) Σₘ₌₀∞ Σₙ₌₀∞ [1/(m! n!)] · x^m y^n",
                "B) 1 + (x+y) + (x+y)²/2! + (x+y)³/3! + …",
                "C) Σₖ₌₀∞ [1/k!] · (x+y)^k",
                "D) f(x,y) = e^x · e^y"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "If f(x,y) is differentiable and equal to its Taylor series in a neighborhood of (a,b), what property does f(x,y) possess?", 
            options: [
                "A) f is analytic at (a,b)",
                "B) f is only continuous at (a,b)",
                "C) f is linear",
                "D) f is constant"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the term corresponding to m = 1 and n = 1 in the Taylor series of f(x,y) about (a,b)?", 
            options: [
                "A) f_xy(a,b)·(x–a)(y–b)",
                "B) (1/2) f_xy(a,b)·(x–a)(y–b)",
                "C) f_xy(a,b)·(x–a) + (y–b)",
                "D) f_x(a,b)(x–a)·f_y(a,b)(y–b)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is a necessary condition for a function f(x,y) to be represented by its Taylor series around a point?", 
            options: [
                "A) f must be infinitely differentiable and analytic at that point",
                "B) f must be continuous only",
                "C) f must have continuous first derivatives only",
                "D) f must be bounded"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "In the Taylor series of two variables, which term represents the pure second derivative with respect to x?", 
            options: [
                "A) (1/2) f_xx(a,b)·(x–a)²",
                "B) f_xx(a,b)·(x–a)²",
                "C) (1/2) f_xy(a,b)·(x–a)²",
                "D) f_xx(a,b)·(x–a)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For the function f(x,y) = sin(x)cos(y), what is the constant term in its Maclaurin expansion?", 
            options: [
                "A) 0",
                "B) sin(0)cos(0)",
                "C) 1",
                "D) cos(0)"
            ], 
            answer: "B" 
        },

        { 
            type: "mcq", 
            question: "What is the general form of the Taylor series expansion for a function f(x,y) about a point (a,b)?", 
            options: [
                "A) f(x,y) = Σₘ₌₀∞ Σₙ₌₀∞ [f^(m,n)(a,b)/(m! n!)] · (x–a)^m (y–b)^n",
                "B) f(x,y) = Σₖ₌₀∞ [f^(k)(a,b)/k!] · [(x–a)+(y–b)]^k",
                "C) f(x,y) = f(a,b) + f_x(a,b)(x–a) + f_y(a,b)(y–b)",
                "D) f(x,y) = Σₘ₌₀∞ [f^(m)(a,b)/m!]·(x–a)^m + Σₙ₌₀∞ [f^(n)(a,b)/n!]·(y–b)^n"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the Maclaurin series expansion for a function f(x,y) about (0,0)?", 
            options: [
                "A) f(x,y) = Σₘ₌₀∞ Σₙ₌₀∞ [f^(m,n)(0,0)/(m! n!)] · x^m y^n",
                "B) f(x,y) = Σₖ₌₀∞ [f^(k)(0,0)/k!] · (x+y)^k",
                "C) f(x,y) = f(0,0) + f_x(0,0)x + f_y(0,0)y",
                "D) f(x,y) = Σₘ₌₀∞ [f^(m)(0,0)/m!]·x^m + Σₙ₌₀∞ [f^(n)(0,0)/n!]·y^n"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the second‑order Maclaurin expansion for f(x,y)= sin(x)cos(y)?", 
            options: [
                "A) sin(x)cos(y) ≈ x – (1/2)x y²",
                "B) sin(x)cos(y) ≈ x + (1/2)y²",
                "C) sin(x)cos(y) ≈ 1 + x – (1/2)y²",
                "D) sin(x)cos(y) ≈ x – y²"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the first‑order Maclaurin expansion for f(x,y)= cos(x)sin(y)?", 
            options: [
                "A) cos(x)sin(y) ≈ x",
                "B) cos(x)sin(y) ≈ y",
                "C) cos(x)sin(y) ≈ x + y",
                "D) cos(x)sin(y) ≈ 1 + y"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the Maclaurin expansion for f(x,y)= sin(x) + cos(y) up to quadratic terms?", 
            options: [
                "A) sin(x) + cos(y) ≈ 1 + x – (1/2)y²",
                "B) sin(x) + cos(y) ≈ x + y – (1/2)x² – (1/2)y²",
                "C) sin(x) + cos(y) ≈ 1 + x + y – (1/2)y²",
                "D) sin(x) + cos(y) ≈ 1 + x – y"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "In the two‑variable Taylor series, what does the term (∂²f/∂x∂y)(a,b) represent?", 
            options: [
                "A) The mixed partial derivative at (a,b)",
                "B) The product of the first partial derivatives",
                "C) The second derivative with respect to x only",
                "D) The second derivative with respect to y only"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x,y)= e^(x)cos(y), what is the constant term in its Maclaurin expansion?", 
            options: [
                "A) 0",
                "B) 1",
                "C) cos(0)",
                "D) e^(0)"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the coefficient of the xy-term in the Taylor series expansion of f(x,y)= sin(x)sin(y) about (0,0)?", 
            options: [
                "A) 1",
                "B) 1/2",
                "C) 0",
                "D) -1"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x,y)= cos(x) + cos(y), what is the linear term in its Maclaurin expansion?", 
            options: [
                "A) x + y",
                "B) 0",
                "C) x",
                "D) y"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following best describes the structure of the Taylor series expansion for two‑variable functions?", 
            options: [
                "A) f(x,y)= Σₘ₌₀∞ Σₙ₌₀∞ [f^(m,n)(a,b)/(m! n!)] · (x–a)^m (y–b)^n",
                "B) f(x,y)= Σₖ₌₀∞ [f^(k)(a,b)/k!] · [(x–a)+(y–b)]^k",
                "C) f(x,y)= f(a,b) + f_x(a,b)(x–a) + f_y(a,b)(y–b)",
                "D) f(x,y)= Σₘ₌₀∞ [f^(m)(a,b)/(m!)]·(x–a)^m + Σₙ₌₀∞ [f^(n)(a,b)/(n!)]·(y–b)^n"
            ], 
            answer: "A" 
        },
        
        // Stationary Points
        { 
            type: "mcq", 
            question: "For f(x) = x² - 4x + 3, which point is stationary?", 
            options: [
                "A) (2, -1)",
                "B) (2, 3)",
                "C) (1, 0)",
                "D) (4, 3)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = x³ - 3x² + 2, what are the x-coordinates of its stationary points?", 
            options: [
                "A) 0 and 2",
                "B) 1 and 2",
                "C) -1 and 1",
                "D) 0 and -2"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "A stationary point of a differentiable function f(x) is a point where:", 
            options: [
                "A) f'(x) = 0",
                "B) f(x) = 0",
                "C) f''(x) = 0",
                "D) f(x) is undefined"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = (x - 1)⁴, what is the nature of its stationary point at x = 1?", 
            options: [
                "A) Local minimum",
                "B) Local maximum",
                "C) Point of inflection",
                "D) None of the above"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = ln(x) - x, find the stationary point.", 
            options: [
                "A) (1, -1)",
                "B) (1, 0)",
                "C) (e, ln(e) - e)",
                "D) (0, -1)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "In the second derivative test, if f''(x) > 0 at a stationary point, then the point is a:", 
            options: [
                "A) Local minimum",
                "B) Local maximum",
                "C) Saddle point",
                "D) Point of inflection"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = x³, the only stationary point is at:", 
            options: [
                "A) (0, 0) – a point of inflection",
                "B) (0, 0) – a local minimum",
                "C) (0, 0) – a local maximum",
                "D) There are no stationary points"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = eˣ - x, the stationary point occurs at:", 
            options: [
                "A) (0, 1)",
                "B) (1, e - 1)",
                "C) (-1, e⁻¹ + 1)",
                "D) (0, 0)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "If a function f(x) has a horizontal tangent at x = c, then:", 
            options: [
                "A) f'(c) = 0",
                "B) f(c) = 0",
                "C) f''(c) = 0",
                "D) f'(c) is undefined"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = sin x on [0, 2π], the stationary points are found at:", 
            options: [
                "A) x = π/2 and x = 3π/2",
                "B) x = 0 and x = π",
                "C) x = π/4 and x = 3π/4",
                "D) x = 0 and x = 2π"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = x² sin x, setting f'(x) = 0 leads to the factorization:", 
            options: [
                "A) x(2 sin x + x cos x) = 0",
                "B) 2 sin x + x cos x = 0",
                "C) x² sin x = 0",
                "D) sin x = 0"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "A function f(x) has a stationary point at x = a if f'(a) equals:", 
            options: [
                "A) 0",
                "B) 1",
                "C) f(a)",
                "D) f''(a)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Why is x = 0 not considered a stationary point for f(x) = |x|?", 
            options: [
                "A) Because f'(0) does not exist",
                "B) Because f(0) ≠ 0",
                "C) Because f''(0) does not exist",
                "D) Because f(x) is not continuous at 0"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following best defines a saddle point?", 
            options: [
                "A) A stationary point that is neither a local maximum nor a local minimum",
                "B) A stationary point that is both a maximum and a minimum",
                "C) A stationary point with f''(x) > 0",
                "D) A stationary point where f'(x) > 0"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = x³ - 3x, determine the nature of its stationary points.", 
            options: [
                "A) x = -1 is a local maximum and x = 1 is a local minimum",
                "B) x = -1 is a local minimum and x = 1 is a local maximum",
                "C) Both are local maxima",
                "D) Both are local minima"
            ], 
            answer: "A" 
        },

        //Linear Approximation
        { 
            type: "mcq", 
            question: "What is the formula for the linear approximation of a function f(x) near x = a?", 
            options: [
                "A) f(x) ≈ f'(a)(x - a)",
                "B) f(x) ≈ f(a) + f'(a)(x - a)",  // correct
                "C) f(x) ≈ f(a) · f'(a)(x - a)",
                "D) f(x) ≈ f(a) + f''(a)(x - a)²"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which concept is most essential to using linear approximation?", 
            options: [
                "A) Integral",
                "B) Limit",
                "C) Derivative", // correct
                "D) Series Expansion"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = √x, what is the linear approximation near x = 4?", 
            options: [
                "A) L(x) = 2 + (1/4)(x - 4)",  // correct
                "B) L(x) = 2 + (1/2)(x - 4)",
                "C) L(x) = 2 + (1/3)(x - 4)",
                "D) L(x) = 2 + (1/4)(x - 4)²"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Linear approximation essentially approximates a function by its:", 
            options: [
                "A) Secant line",
                "B) Tangent line", // correct
                "C) Quadratic curve",
                "D) Exponential function"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "When using linear approximation, the point a is typically chosen so that f(a) is:", 
            options: [
                "A) Easily computed", // correct
                "B) Very large",
                "C) Not defined",
                "D) Zero"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = ln x near x = 1, what is the linear approximation?", 
            options: [
                "A) L(x) = ln 1 + (x - 1)",
                "B) L(x) = (x - 1)²",
                "C) L(x) = (x - 1)", // correct, since ln 1 = 0
                "D) L(x) = 1 + (x - 1)"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Linear approximation is also known as:", 
            options: [
                "A) Quadratic approximation",
                "B) Differential approximation",
                "C) Tangent line approximation", // correct
                "D) Maclaurin series"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Linear approximation is most accurate when x is:", 
            options: [
                "A) Close to a", // correct
                "B) Far from a",
                "C) At infinity",
                "D) Exactly equal to f(x)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "If f(x) is differentiable at x = a, what is true regarding the error term of its linear approximation?", 
            options: [
                "A) The error is constant for all x",
                "B) There is no error",
                "C) The error is proportional to (x - a)", 
                "D) The error is proportional to (x - a)²" // correct
            ], 
            answer: "D" 
        },

        // Rolle's and Mean Value Theorem
        { 
            type: "mcq", 
            question: "Which of the following is a necessary condition for Rolle's Theorem to hold on [a, b]?",
            options: [
                "A) f is continuous on [a, b]",
                "B) f is differentiable on (a, b)",
                "C) f(a) = f(b)",
                "D) All of the above" // correct
            ], 
            answer: "D" 
        },
        { 
            type: "mcq", 
            question: "If f(x) = (x - 2)² on [0, 4], then Rolle's Theorem guarantees the existence of a c in (0, 4) such that:",
            options: [
                "A) f'(c) = 4",
                "B) f(c) = 0",
                "C) f'(c) = 0", // correct
                "D) f(c) = 2"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "According to the Mean Value Theorem, for a function f that is continuous on [a, b] and differentiable on (a, b), there exists a c in (a, b) such that:",
            options: [
                "A) f'(c) = f(b) - f(a)",
                "B) f'(c) = (f(b) - f(a))/(b - a)", // correct
                "C) f(c) = (f(b) + f(a))/(b - a)",
                "D) f(c) = (f(b) - f(a))/(b + a)"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following functions fails to satisfy the hypotheses of the Mean Value Theorem on [-1, 1]?",
            options: [
                "A) f(x) = x³",
                "B) f(x) = |x|", // correct (not differentiable at 0)
                "C) f(x) = sin x",
                "D) f(x) = x²"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Rolle's Theorem is a special case of the Mean Value Theorem when:",
            options: [
                "A) f is differentiable on (a, b)",
                "B) f is continuous on [a, b]",
                "C) f(a) = f(b)", // correct
                "D) f'(x) exists for all x in [a, b]"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = sin x on [0, π], what value of c is guaranteed by the Mean Value Theorem?",
            options: [
                "A) π/4",
                "B) π/2", // correct (since f'(c)=cos c = 0)
                "C) π/3",
                "D) π"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "For f(x) = 1/x on [1, 2], find the value of c guaranteed by the Mean Value Theorem.",
            options: [
                "A) 1.5",
                "B) √2 (approximately 1.414)", // correct
                "C) 1.25",
                "D) 2"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is NOT required for a function to satisfy the Mean Value Theorem on [a, b]?",
            options: [
                "A) The function must be continuous on [a, b]",
                "B) The function must be differentiable on (a, b)",
                "C) The function must satisfy f(a) = f(b)", // correct
                "D) The function's derivative must exist for every x in (a, b)"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "True or False: The Mean Value Theorem guarantees that there exists a point c in (a, b) where f'(c) = 0.",
            options: [
                "A) True",
                "B) False", // correct
                "C) Sometimes True",
                "D) Cannot be determined"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "If f is differentiable on (a, b) and f'(x) = 0 for every x in (a, b), what does the Mean Value Theorem imply about f on [a, b]?",
            options: [
                "A) f is strictly increasing",
                "B) f is strictly decreasing",
                "C) f is constant", // correct
                "D) f has at least one stationary point"
            ], 
            answer: "C" 
        },

        //Bounded Functions
        { 
            type: "mcq", 
            question: "A function f: ℝ → ℝ is said to be bounded above if:",
            options: [
                "A) There exists a number M such that f(x) ≤ M for all x ∈ ℝ",  // correct
                "B) There exists a number m such that f(x) ≥ m for all x ∈ ℝ",
                "C) f(x) is defined for all x ∈ ℝ",
                "D) f(x) is continuous for all x ∈ ℝ"
            ], 
            answer: "A"
        },
        { 
            type: "mcq", 
            question: "Which of the following functions is bounded?",
            options: [
                "A) f(x) = x²",
                "B) f(x) = sin x",  // correct
                "C) f(x) = e^x",
                "D) f(x) = ln(x)"
            ], 
            answer: "B"
        },
        { 
            type: "mcq", 
            question: "A function f is monotonic increasing if:",
            options: [
                "A) f(x) < f(y) whenever x < y",
                "B) f(x) ≥ f(y) whenever x < y",
                "C) f(x) ≤ f(y) whenever x < y",  // correct (non-decreasing)
                "D) f(x) = f(y) for all x, y"
            ], 
            answer: "C"
        },
        { 
            type: "mcq", 
            question: "Which of the following functions is strictly decreasing on its domain?",
            options: [
                "A) f(x) = -x",  // correct
                "B) f(x) = x³",
                "C) f(x) = e^x",
                "D) f(x) = ln x"
            ], 
            answer: "A"
        },
        { 
            type: "mcq", 
            question: "A function f is said to be bounded if:",
            options: [
                "A) f is either bounded above or bounded below",
                "B) f is both bounded above and bounded below",  // correct
                "C) f is continuous",
                "D) f is monotonic"
            ], 
            answer: "B"
        },
        { 
            type: "mcq", 
            question: "Which property is necessary for a function to have a global maximum on an interval?",
            options: [
                "A) The function must be increasing",
                "B) The function must be bounded above",  // correct
                "C) The function must be unbounded",
                "D) The function must be monotonic"
            ], 
            answer: "B"
        },
        { 
            type: "mcq", 
            question: "If f is continuous and monotonic on a closed interval [a, b], then:",
            options: [
                "A) f is necessarily differentiable on (a, b)",
                "B) f attains both its maximum and minimum values on [a, b]",  // correct
                "C) f must be linear",
                "D) f is unbounded"
            ], 
            answer: "B"
        },
        { 
            type: "mcq", 
            question: "A bounded, monotonic sequence always:",
            options: [
                "A) Diverges",
                "B) Oscillates",
                "C) Converges",  // correct
                "D) Is constant"
            ], 
            answer: "C"
        },
        { 
            type: "mcq", 
            question: "The function f(x) = 1/(1 + x²) is bounded. What is its range?",
            options: [
                "A) [0, 1]",  // correct
                "B) [-1, 1]",
                "C) (0, 1]",
                "D) ℝ"
            ], 
            answer: "A"
        },
        { 
            type: "mcq", 
            question: "For a function f that is monotonic increasing and differentiable, which statement about its derivative is generally true?",
            options: [
                "A) f'(x) > 0 for all x in its domain",
                "B) f'(x) ≥ 0 for all x in its domain",  // correct (allows for constant intervals)
                "C) f'(x) < 0 for all x",
                "D) f'(x) ≤ 0 for all x"
            ], 
            answer: "B"
        },
        { 
            type: "mcq", 
            question: "If a function f is strictly decreasing on an interval, then for any x₁ < x₂ in that interval:",
            options: [
                "A) f(x₁) < f(x₂)",
                "B) f(x₁) = f(x₂)",
                "C) f(x₁) > f(x₂)",  // correct
                "D) f(x₁) ≥ f(x₂)"
            ], 
            answer: "C"
        },
        { 
            type: "mcq", 
            question: "Which of the following best describes an increasing function graphically?",
            options: [
                "A) It rises from lower left to upper right",  // correct
                "B) It falls from upper left to lower right",
                "C) It is symmetric about the y-axis",
                "D) It oscillates frequently"
            ], 
            answer: "A"
        },
        { 
            type: "mcq", 
            question: "For a function to be called bounded, it must be:",
            options: [
                "A) Bounded above only",
                "B) Bounded below only",
                "C) Bounded above and below",  // correct
                "D) Neither bounded above nor below"
            ], 
            answer: "C"
        },
        { 
            type: "mcq", 
            question: "If f is continuous on [a, b] and monotonic, then which of the following is true?",
            options: [
                "A) f is invertible on [a, b]",
                "B) f attains its maximum and minimum values on [a, b]",  // correct
                "C) f must be differentiable on (a, b)",
                "D) f is necessarily constant"
            ], 
            answer: "B"
        },
        { 
            type: "mcq", 
            question: "Which of the following is an example of a bounded and monotonic function?",
            options: [
                "A) f(x) = x²",
                "B) f(x) = sin x",
                "C) f(x) = arctan x",  // correct; monotonic increasing and bounded between -π/2 and π/2
                "D) f(x) = e^x"
            ], 
            answer: "C"
        },

        //Integrals
        { 
            type: "mcq", 
            question: "1. What is the indefinite integral ∫ x² dx?",
            options: [
                "A) x³ + C",
                "B) x³/3 + C",  // correct
                "C) 2x + C",
                "D) (1/3)x³ + 3"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "2. Find the antiderivative of cos x.",
            options: [
                "A) sin x + C",  // correct
                "B) -sin x + C",
                "C) cos x + C",
                "D) -cos x + C"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "3. Evaluate the definite integral ∫₀^π sin x dx.",
            options: [
                "A) 0",
                "B) 1",
                "C) 2",  // correct
                "D) π"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "4. Compute ∫₁² (1/x) dx.",
            options: [
                "A) ln 2",
                "B) ln(2) - ln(1)",  // correct (since ln1 = 0)
                "C) 1/2",
                "D) ln 2 + 1"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "5. Which expression represents the Fundamental Theorem of Calculus for a continuous function f on [a, b]?",
            options: [
                "A) ∫ₐᵇ f(x) dx = F(b) - F(a)",  // correct
                "B) ∫ₐᵇ f(x) dx = F(a) - F(b)",
                "C) ∫ₐᵇ f(x) dx = f(b) - f(a)",
                "D) ∫ₐᵇ f(x) dx = F(b) + F(a)"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "6. What is the indefinite integral ∫ (1/x) dx?",
            options: [
                "A) 1/x + C",
                "B) ln|x| + C",  // correct
                "C) x + C",
                "D) e^x + C"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "7. Determine ∫ e^x dx.",
            options: [
                "A) e^x + C",  // correct
                "B) x e^x + C",
                "C) e^(x+1) + C",
                "D) e^(x) / x + C"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "8. Evaluate the definite integral ∫₀¹ e^x dx.",
            options: [
                "A) e - 1",  // correct
                "B) 1 - e",
                "C) e",
                "D) 1/e"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "9. Which of the following represents the double integral of f(x, y) over the rectangular region R = [a, b] × [c, d]?",
            options: [
                "A) ∬_R f(x, y) dA = ∫ₐᵇ ∫_c^d f(x, y) dy dx",  // correct
                "B) ∬_R f(x, y) dA = ∫_c^d ∫ₐᵇ f(x, y) dx dy",
                "C) Both A and B are correct",
                "D) ∬_R f(x, y) dA = ∫ₐᵇ f(x, y) dx + ∫_c^d f(x, y) dy"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "10. What does the double integral ∬_R 1 dA represent for a region R?",
            options: [
                "A) The perimeter of R",
                "B) The area of R",  // correct
                "C) The volume under R",
                "D) The average value of R"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "11. A line integral of a scalar function f along a curve C is defined by:",
            options: [
                "A) ∫_C f(x, y) ds",  // correct
                "B) ∫_C f(x, y) dx",
                "C) ∫_C f(x, y) dy",
                "D) ∫_C f(x, y) dA"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "12. Which of the following best describes the geometric meaning of a line integral of a scalar function?",
            options: [
                "A) It gives the total mass of a wire with density f along curve C",  // correct
                "B) It gives the area under the curve",
                "C) It gives the volume under a surface",
                "D) It gives the rate of change along the curve"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "13. What is the primary difference between a definite and an indefinite integral?",
            options: [
                "A) A definite integral includes limits of integration and yields a number, while an indefinite integral represents a family of functions",  // correct
                "B) An indefinite integral includes limits of integration",
                "C) A definite integral always yields a function",
                "D) There is no difference"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "14. Which method is most appropriate for evaluating a double integral over a circular region?",
            options: [
                "A) Rectangular coordinates",
                "B) Polar coordinates",  // correct
                "C) Spherical coordinates",
                "D) Cylindrical coordinates"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "15. Evaluate ∫₀⁴ √x dx.",
            options: [
                "A) (8/3)",
                "B) (16/3)",  // correct [since ∫√x dx = (2/3)x^(3/2)]
                "C) 4",
                "D) (2/3)"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "16. Which technique is commonly used to evaluate integrals of rational functions?",
            options: [
                "A) Integration by parts",
                "B) Partial fractions",  // correct
                "C) Substitution",
                "D) Trigonometric substitution"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "17. What is the indefinite integral ∫ sec² x dx?",
            options: [
                "A) tan x + C",  // correct
                "B) -tan x + C",
                "C) sec x + C",
                "D) -sec x + C"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "18. To evaluate a double integral over a non-rectangular region, which change of variables is often most useful?",
            options: [
                "A) Cartesian to spherical",
                "B) Cartesian to polar",  // correct
                "C) Cartesian to cylindrical",
                "D) No change is necessary"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "19. Evaluate ∫₀^(2π) sin²θ dθ. [i.e at (0,2π)]",
            options: [
                "A) π",  // correct
                "B) 2π",
                "C) π/2",
                "D) 0"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "20. A line integral of a vector field F along a closed, positively oriented, simple curve C in the plane can be evaluated using:",
            options: [
                "A) Divergence Theorem",
                "B) Green's Theorem",  // correct
                "C) Stokes' Theorem",
                "D) Fundamental Theorem of Calculus"
            ], 
            answer: "B" 
        },

        { 
            type: "mcq", 
            question: "1. Evaluate the line integral ∫_C (x + y) ds, where C is the line segment from (0, 0) to (1, 1).",
            options: [
                "A) √2",             // correct: parameterize r(t) = (t, t), ds = √2 dt, integral = 2√2 ∫₀¹ t dt = √2
                "B) 1",
                "C) 2",
                "D) 2√2"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "2. Evaluate the line integral ∫_C y dx along the curve C defined by y = x² from x = 0 to x = 1.",
            options: [
                "A) 1/2",
                "B) 1/4",
                "C) 1/3",          // correct: ∫₀¹ x² dx = 1/3
                "D) 1"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "3. Let F(x, y) = (2x, 2y). Evaluate the line integral ∫_C F · dr along any smooth curve from (0, 0) to (1, 1).",
            options: [
                "A) √2",
                "B) 2",             // correct: F is conservative with potential f(x, y) = x² + y² so the integral equals f(1,1) - f(0,0) = 2.
                "C) 1",
                "D) 0"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "4. Evaluate the closed line integral ∮_C (x dy - y dx) for the circle x² + y² = 4 traversed counterclockwise.",
            options: [
                "A) 4π",
                "B) 8π",           // correct: Parameterizing with x = 2cos t, y = 2sin t gives x dy - y dx = 4 dt; integrating from 0 to 2π yields 8π.
                "C) 2π",
                "D) 16π"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "5. Evaluate the line integral ∮_C (y dx + x dy) along the closed curve C given by x² + y² = 9.",
            options: [
                "A) 0",            // correct: x dy + y dx = d(xy), and the integral over a closed curve of an exact differential is zero.
                "B) 18π",
                "C) 9π",
                "D) 6π"
            ], 
            answer: "A" 
        },

    ];
    
        
        // Add these questions to your existing questions array
      //  questions.push(...additionalQuestions);];

    function selectRandomQuestions() {
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        selectedQuestions = shuffled.slice(0, totalQuestions);
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form refresh
        
        const matricNo = document.getElementById("matric-no").value.trim();
        const password = document.getElementById("password").value.trim();
    
        if (matricNo === "" || password === "") {
            alert("Please enter both Matric No and Password.");
            return;
        }
    
        userMatric.textContent = matricNo;
        userMatricTest.textContent = matricNo;
        
        
        // Hide home page and show instructions page
        homePage.classList.add("hidden");
        instructionsPage.classList.remove("hidden");
    });
    

    startTestBtn.addEventListener("click", () => {
        instructionsPage.classList.add("hidden");
        testPage.classList.remove("hidden");
        selectRandomQuestions();
        document.body.prepend(timerDisplay);
        startTimer();
        generateQuestionIcons();
        loadQuestion();
    });

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitTest();
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }

    function generateQuestionIcons() {
        questionIconsDiv.innerHTML = "";
        for (let i = 1; i <= totalQuestions; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("question-btn");
            btn.addEventListener("click", () => {
                currentQuestion = i;
                loadQuestion();
            });
            questionIconsDiv.appendChild(btn);
        }
    }

    function loadQuestion() {
        const q = selectedQuestions[currentQuestion - 1];
        questionText.textContent = `Question ${currentQuestion}: ${q.question}`;
        optionsDiv.innerHTML = "";

        if (q.type === "mcq") {
            q.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = "answer";
                input.value = option;

                label.appendChild(input);
                label.append(option);
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement("br"));
            });
        } else {
            const input = document.createElement("input");
            input.type = "text";
            input.id = "fill-answer";
            optionsDiv.appendChild(input);
        }
    }

    saveButton.addEventListener("click", () => {
        const selectedOption = document.querySelector("input[name='answer']:checked");
        const fillAnswer = document.getElementById("fill-answer");

        if (selectedOption) {
            answers[currentQuestion] = selectedOption.value;
        } else if (fillAnswer) {
            answers[currentQuestion] = fillAnswer.value;
        }

        updateQuestionIconColor();
    });

    function updateQuestionIconColor() {
        document.querySelectorAll(".question-btn").forEach((btn, index) => {
            if (answers[index + 1]) {
                btn.style.backgroundColor = "blue";
                btn.style.color = "white";
            }
        });
    }


    submitButton.addEventListener("click", submitTest);

    function submitTest() {
        clearInterval(timerInterval);
        testPage.classList.add("hidden");

        let correctAnswers = 0;
        reviewPage.innerHTML = "<h2>Test Submitted! Review Your Answers</h2>";

        selectedQuestions.forEach((q, index) => {
            const userAnswer = answers[index + 1] || "Not Answered";
            const isCorrect = q.type === "mcq" 
                ? (userAnswer.charAt(0).toUpperCase() === q.answer.toUpperCase())
                : (userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase());

            if (isCorrect) correctAnswers++;

            reviewPage.innerHTML += `
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${q.options[q.answer.charCodeAt(0) - 65]}</p>
                <p style="color: ${isCorrect ? 'green' : 'red'}; font-weight: bold;">
                    ${isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </p>
            `;
        });

        reviewPage.innerHTML = `<h3>You scored ${correctAnswers} out of ${totalQuestions}.</h3>` + reviewPage.innerHTML;
        document.body.appendChild(reviewPage);
        alert("Test submitted! Check your results.");
    }

    document.getElementById("next").addEventListener("click", () => {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            loadQuestion();
        }
    });

    document.getElementById("prev").addEventListener("click", () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            loadQuestion();
        }
    });
});