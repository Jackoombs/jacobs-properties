import Jon from "../../assets/images/team/jon.webp";
import Cameron from "../../assets/images/team/cameron.webp";
import Ashlea from "../../assets/images/team/ashlea.webp";
import Ian from "../../assets/images/team/ian.webp";
import Elaine from "../../assets/images/team/elaine.webp";
import Miriam from "../../assets/images/team/miriam.webp";
import Denis from "../../assets/images/team/denis.webp";
import Jack from "../../assets/images/team/jack.webp";

export type TeamCardType = {
  name: string;
  role: string;
  bio: string;
  imagePath: string;
  linkedInLink?: string;
  email?: string;
};

export const teamTemplate: TeamCardType[] = [
  {
    name: "Jon Coombs",
    role: "Managing Director",
    imagePath: Jon.src,
    linkedInLink: "",
    bio: "Jon founded Jacobs Properties in 1997 and has a lot of experience in both sales and lettings as well as property development, including HMO properties. He loves his job and is passionate about helping and supporting clients as well as seeing the Jacobs Team grow and develop. Apart from work, Jon enjoys spending time with friends and family, travelling, eating out and playing guitar in a local band. Watching Man U win whilst drinking a pint of real ale is considered the perfect way to relax.",
    email: "joncoombs@jacobs.properties",
  },
  {
    name: "Cameron George",
    role: "Sales & Lettings Manager",
    imagePath: Cameron.src,
    linkedInLink: "",
    bio: "Cameron has worked within the industry for 10 years and has excelled in his career throughout that time. Cameron’s strengths are his adaptability and versatility to work with every Vendor, Investor, Landlord and Tenant successfully and ensure that the service he provides is tailored to their individual needs to maximise positive results. In his free time he manages two local football teams and is a devoted West Ham supporter – but first and foremost he is ‘Dad’ to his young son.",
    email: "camerongeorge@jacobs.properties",
  },
  {
    name: "Ian Smith",
    role: "Property Manager",
    imagePath: Ian.src,
    linkedInLink: "",
    bio: "Ian has over 30 years of experience in the industry having worked in lettings, property management and relocation. He is a natural completer finisher with exceptional attention to detail. Nothing motivates him more than seeing a job well done. Weekends are usually taken up with family and DIY but occasionally he enjoys celebrating a West Ham win.",
    email: "iansmith@jacobs.properties",
  },
  {
    name: "Ashlea Harrod",
    role: "Sales Negotiator & Chain Progressor",
    imagePath: Ashlea.src,
    linkedInLink: "",
    bio: "Ashlea has worked for the company for over 15 years and lives in Oakley with her husband and 3 children. She has come from a background in marketing and travel but has always had an interest in property. She is a busy mum to her family but in her spare time likes to continue to update their renovated property and plan the next family trip.",
    email: "ashleaharrod@jacobs.properties",
  },
  {
    name: "Elaine Coombs",
    role: "Finance & Admin",
    imagePath: Elaine.src,
    linkedInLink: "",
    bio: "Elaine has a banking background working for Barclays from the age of 16 and held a number of management positions over the years. She moved into accounts and financial management following a career break to bring up her family. Elaine deals with lots of sales and lettings admin across the company and plays a vital role in managing client and tenant money transactions. When she’s not at work Elaine is a sourdough specialist.",
    email: "elainecoombs@jacobs.properties",
  },
  {
    name: "Miriam Price",
    role: "HMO Support & Administration",
    imagePath: Miriam.src,
    linkedInLink: "",
    bio: "As you probably guessed from the photo, Miriam is from Brazil. Miriam joined the team about 7 years ago and plays a vital role in overseeing the smooth running of our HMO let properties. Miriam always works with a smile and is the life and soul of the party. She has 2 grown up children and is married to Ben.",
    email: "miriam-price@hotmail.com",
  },
  {
    name: "Denis Acquaah",
    role: "Mortgage Advisor",
    imagePath: Denis.src,
    linkedInLink: "",
    bio: "Denis has worked in Financial Services for over 16 years and has been a Mortgage and Protection Consultant for the last 9 years. His primary focus is building long term relationships with his clients and their families. Initially helping them buy their homes and, as years go by, assisting with mortgaging all the time making sure that they have adequate long-term protection. He also specialises in Investment and Buy To Let mortgages. Away from work, Denis spends his spare time with his wife, Becky and his 2 young sons. As a family they are all heavily involved with his local community which includes charitable work with young people.",
    email: "denis@coxandflight.com",
  },
  {
    name: "Jack Coombs",
    role: "IT, Web Development & Social media",
    imagePath: Jack.src,
    linkedInLink: "",
    bio: "Every estate agent needs a Jack. Estate agency has become increasing complicated with the integration of CRMs to marketing platforms, websites, and other forms of proptech and social media - social media being central to the marketing strategy of any forward thinking agency. Jack has a degree in Physics and is heavily relied upon for the ongoing development of the agency. Jack is an awesome bass player as well as prolific reader.",
    email: "jackg.coombs97@gmail.com",
  },
];
