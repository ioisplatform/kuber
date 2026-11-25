export interface RailwayQuestion {
  id: number;
  category: 'General Science' | 'Railway GK' | 'Static GK' | 'Reasoning & Math';
  question: string;
  hindiQuestion: string;
  options: string[];
  correctAnswer: string;
  repeatedIn: string;
  explanation: string;
}

export interface MockPaper {
  id: string;
  title: string;
  exam: string;
  totalQuestions: number;
  duration: string;
  marks: number;
  difficulty: 'Moderate' | 'Standard Exam Level' | 'High';
  downloadFileName: string;
}

export interface AIPromptItem {
  id: number;
  category: 'Math Shortcuts' | 'GK Mnemonics' | 'Mock Interviewer' | 'English & Reasoning';
  title: string;
  promptText: string;
  useCase: string;
}

export interface InterviewVideo {
  id: string;
  title: string;
  duration: string;
  speaker: string;
  topic: string;
  youtubeId: string;
  keyPoints: string[];
}

export const RAILWAY_101_QUESTIONS: RailwayQuestion[] = [
  {
    id: 1,
    category: 'Railway GK',
    question: 'When did the first passenger train run in India and on which route?',
    hindiQuestion: 'भारत में पहली पैसेंजर ट्रेन कब और किस रूट पर चली थी?',
    options: ['16 April 1853 (Bombay to Thane)', '15 August 1854 (Howrah to Hooghly)', '26 January 1850 (Madras to Arcot)', '10 May 1857 (Delhi to Meerut)'],
    correctAnswer: '16 April 1853 (Bombay to Thane)',
    repeatedIn: 'RRB NTPC 2016, 2021, Group D 2018, 2022',
    explanation: 'The first train in India ran between Bori Bunder (Mumbai) and Thane on 16th April 1853, covering 34 km with 3 locomotives: Sultan, Sindh, and Sahib.'
  },
  {
    id: 2,
    category: 'General Science',
    question: 'What is the SI unit of electric resistance?',
    hindiQuestion: 'विद्युत प्रतिरोध का SI मात्रक क्या है?',
    options: ['Ohm (Ω)', 'Volt (V)', 'Ampere (A)', 'Watt (W)'],
    correctAnswer: 'Ohm (Ω)',
    repeatedIn: 'RRB Group D 2018, 2019, 2022, ALP 2018',
    explanation: 'Electric resistance is measured in Ohms (Ω), according to Ohm’s Law: V = IR.'
  },
  {
    id: 3,
    category: 'Railway GK',
    question: 'Where is the headquarters of East Central Railway (ECR) located?',
    hindiQuestion: 'पूर्व मध्य रेलवे (ECR) का मुख्यालय कहाँ स्थित है?',
    options: ['Hajipur (Bihar)', 'Patna', 'Kolkata', 'Gorakhpur'],
    correctAnswer: 'Hajipur (Bihar)',
    repeatedIn: 'RRB Patna Group D 2018, NTPC 2021, Bihar Police 2023',
    explanation: 'East Central Railway with headquarters at Hajipur, Bihar was established on 1st October 2002.'
  },
  {
    id: 4,
    category: 'General Science',
    question: 'Which gas is released during the reaction of metals with dilute hydrochloric acid?',
    hindiQuestion: 'धातुओं की तनु हाइड्रोक्लोरिक अम्ल के साथ अभिक्रिया से कौन सी गैस निकलती है?',
    options: ['Hydrogen (H₂)', 'Oxygen (O₂)', 'Carbon Dioxide (CO₂)', 'Nitrogen (N₂)'],
    correctAnswer: 'Hydrogen (H₂)',
    repeatedIn: 'RRB Group D 2022 (Shift 1, 3), NTPC 2016',
    explanation: 'Metal + Dilute Acid -> Metal Salt + Hydrogen Gas (H₂). Test with a burning splinter gives pop sound.'
  },
  {
    id: 5,
    category: 'Static GK',
    question: 'Which is the longest railway platform in the world as per Guinness World Records?',
    hindiQuestion: 'गिनीज वर्ल्ड रिकॉर्ड्स के अनुसार दुनिया का सबसे लंबा रेलवे प्लेटफॉर्म कौन सा है?',
    options: ['Shree Siddharoodha Swamiji Hubballi Station (1,507m)', 'Gorakhpur Railway Station (1,366m)', 'Kollam Junction (1,180m)', 'Kharagpur Railway Station (1,072m)'],
    correctAnswer: 'Shree Siddharoodha Swamiji Hubballi Station (1,507m)',
    repeatedIn: 'RRB NTPC 2022, Current Affairs 2023-2024',
    explanation: 'Hubballi railway station in Karnataka holds the world record with platform #8 measuring 1,507 meters.'
  },
  {
    id: 6,
    category: 'General Science',
    question: 'What is the chemical formula of Washing Soda?',
    hindiQuestion: 'धावन सोडा (Washing Soda) का रासायनिक सूत्र क्या है?',
    options: ['Na₂CO₃·10H₂O', 'NaHCO₃', 'Ca(OH)₂', 'CaOCl₂'],
    correctAnswer: 'Na₂CO₃·10H₂O',
    repeatedIn: 'RRB Group D 2018, 2022 repeated in 14 shifts',
    explanation: 'Sodium carbonate decahydrate is Washing Soda. NaHCO₃ is Baking Soda.'
  },
  {
    id: 7,
    category: 'Static GK',
    question: 'In which year was the partition of Railway Budget from General Budget reunited?',
    hindiQuestion: 'रेल बजट को आम बजट में पुनः किस वर्ष मिलाया गया था?',
    options: ['2017', '2014', '2019', '2015'],
    correctAnswer: '2017',
    repeatedIn: 'RRB NTPC CBT 2 2022, SSC CGL 2020',
    explanation: 'Based on the Bibek Debroy Committee recommendations, the 92-year-old practice of a separate railway budget was merged with the union budget in 2017.'
  },
  {
    id: 8,
    category: 'Reasoning & Math',
    question: 'A train 180 meters long is traveling at 54 km/h. How many seconds will it take to pass a pole?',
    hindiQuestion: '180 मीटर लंबी ट्रेन 54 किमी/घंटा की गति से चल रही है। एक खंभे को पार करने में कितने सेकंड लगेंगे?',
    options: ['12 seconds', '10 seconds', '15 seconds', '8 seconds'],
    correctAnswer: '12 seconds',
    repeatedIn: 'RRB Group D 2018, RRB ALP 2018, SSC GD 2021',
    explanation: 'Speed = 54 * 5/18 = 15 m/s. Time = Distance / Speed = 180 / 15 = 12 seconds.'
  }
];

export const MOCK_PAPERS_LIST: MockPaper[] = [
  { id: 'MP-01', title: 'RRB Group D Full Length Test 01 - Science & Math Special', exam: 'RRB Group D', totalQuestions: 100, duration: '90 Mins', marks: 100, difficulty: 'Standard Exam Level', downloadFileName: 'KUBER_GroupD_Mock_01.pdf' },
  { id: 'MP-02', title: 'RRB NTPC CBT-1 All-India Mock 01 - Current & GS', exam: 'RRB NTPC', totalQuestions: 100, duration: '90 Mins', marks: 100, difficulty: 'Standard Exam Level', downloadFileName: 'KUBER_NTPC_CBT1_01.pdf' },
  { id: 'MP-03', title: 'RRB Assistant Loco Pilot (ALP) CBT-1 Technical & Science', exam: 'RRB ALP', totalQuestions: 75, duration: '60 Mins', marks: 75, difficulty: 'High', downloadFileName: 'KUBER_ALP_CBT1_01.pdf' },
  { id: 'MP-04', title: 'SSC GD Constable Hindi/Math/Reasoning Full Test', exam: 'SSC GD', totalQuestions: 80, duration: '60 Mins', marks: 160, difficulty: 'Standard Exam Level', downloadFileName: 'KUBER_SSCGD_01.pdf' },
  { id: 'MP-05', title: 'Bihar Police Constable & SI Practice Paper 01', exam: 'Bihar State Police', totalQuestions: 100, duration: '120 Mins', marks: 100, difficulty: 'Moderate', downloadFileName: 'KUBER_BiharPolice_01.pdf' },
  { id: 'MP-06', title: 'Indian Railways General Awareness & Static 500 MCQ Pack', exam: 'RRB All Exams', totalQuestions: 100, duration: '90 Mins', marks: 100, difficulty: 'Moderate', downloadFileName: 'KUBER_RailwayStaticGK.pdf' }
];

export const AI_PROMPTS_LIST: AIPromptItem[] = [
  {
    id: 1,
    category: 'Math Shortcuts',
    title: 'Speed Time & Distance Formula Simplifier',
    promptText: 'Explain the relative speed formulas for two trains moving towards each other and in the same direction in simple Hindi and English. Provide 3 step-by-step solved shortcuts for RRB Group D.',
    useCase: 'Converts complex train formulas into 15-second visual tricks.'
  },
  {
    id: 2,
    category: 'GK Mnemonics',
    title: 'Indian National Parks & Biosphere Trick Generator',
    promptText: 'Create memorable Hindi mnemonic stories to memorize all National Parks of Bihar, West Bengal, and Madhya Pradesh for railway exams.',
    useCase: 'Permanently locks state wildlife reserves into memory without rote cramming.'
  },
  {
    id: 3,
    category: 'Mock Interviewer',
    title: 'Simulate Railway Document Verification & Board Interview',
    promptText: 'Act as a senior Railway Recruitment Board (RRB) panel officer conducting an interview and document review. Ask me 5 tough situational questions one by one and grade my response.',
    useCase: 'Prepares candidate for psychological poise during RRB Document Verification and interview rounds.'
  },
  {
    id: 4,
    category: 'English & Reasoning',
    title: 'Syllogism and Blood Relations 100% Accuracy Framework',
    promptText: 'Explain the 4 golden rules of Venn Diagram Syllogisms without confusion. Give 5 practice statements with "Only a few" cases used in latest SSC exams.',
    useCase: 'Master modern trick questions that cause negative marks.'
  }
];

export const INTERVIEW_VIDEOS_LIST: InterviewVideo[] = [
  {
    id: 'VID-01',
    title: 'Railway Document Verification: Complete Document Checklist & Affidavits',
    duration: '18:45',
    speaker: 'Ex-RRB Senior Supervisor',
    topic: 'Document Verification & OBC/EWS Certificate Validation',
    youtubeId: 'dQw4w9WgXcQ',
    keyPoints: [
      'Original 10th marksheet vs Aadhaar card name discrepancy affidavit',
      'Format of Central Govt OBC-NCL and EWS certificate validity dates',
      'NOC requirement for currently employed candidates'
    ]
  },
  {
    id: 'VID-02',
    title: 'RRB Medical Examination Rules: Eye Vision Standards (A2, A3, B1, B2)',
    duration: '22:10',
    speaker: 'Dr. S. K. Verma (Railway Medical Expert)',
    topic: 'Physical & Eye Test Guidelines',
    youtubeId: 'dQw4w9WgXcQ',
    keyPoints: [
      'Visual Acuity 6/6 and 6/9 requirements for ALP and Station Master',
      'Color blindness test (Ishihara plate test) procedures',
      'Blood pressure, ECG, and diabetes norms during medical check'
    ]
  },
  {
    id: 'VID-03',
    title: 'Overcoming Spoken Hindi/English Hesitation in Govt Job Interviews',
    duration: '15:30',
    speaker: 'Prof. Animesh Sinha (Patna University Career Cell)',
    topic: 'Personality & Interview Poise',
    youtubeId: 'dQw4w9WgXcQ',
    keyPoints: [
      'How to introduce yourself professionally in Hindi or English',
      'Handling gap years after graduation honestly and positively',
      'Body language, greeting the panel, and calm posture'
    ]
  }
];
