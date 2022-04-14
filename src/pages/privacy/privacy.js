import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory,useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import UserContext from "../../contexts/userContext";

const Privacy = () => {
    return(
        <>
        <div class="term-padding">
            <h1>PRIVACY POLICY</h1>
            <p>
                <b>Last Updated</b>: June 16, 2021
                <br/><b>INTRODUCTION</b>
                <br/>This Privacy Policy governs the manner in which Left Diamonds, LLC. collects, uses, maintains and discloses information collected from Customers and End Users (each, a “User”, “You”) on our www.momnpophub.com website (“Site”) and Mom N Pop Hub (“Application”). This Privacy Policy does not describe information collection practices on other websites, or Application including those linked to or from our website.
                <br/><b>PURPOSE OF THIS PRIVACY POLICY</b>
                <br/>The purpose of this privacy policy is to help you better understand how we store, collect, and process your personal data. This policy is meant to help you understand more about why we collect and use your data whether you’re a Left Diamonds LLC customer or even if you’re just visiting Left Diamonds LLC site or Application. 
                <br/>In particular, by visiting this website or Application you consent to our collection and use of your personal information as described in this privacy policy, including any updates or revisions to this privacy policy. This policy does not apply to information collected by any third party, including through any Application or content that can be accessible from this website.
                <br/><b>CHANGES TO THIS PRIVACY POLICY</b>
                <br/>Left Diamonds LLC has the discretion to update this privacy policy at any time. When we do, we will revise the updated date. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
                <br/><b>CCPA DISCLOSURE</b>
                <br/>Under the California Consumer Privacy Act of 2018 (CCPA), Left Diamonds LLC must affirmatively inform California consumers of the categories of personal information collected about the consumer, the sources from which that information is collected, the commercial or business purpose for which the personal information is collected, the categories of third parties the information will be shared with, and specific pieces of personal information collected about the consumer.
                <br/><h4>WHO WE ARE</h4>
                <br/>We are a data Processor and Collector. We process data received from our website and Application and take proportionate precaution in storing such information for short periods on our secure servers until permanently destroyed.
                <br/><b>PURPOSE FOR USING YOUR INFORMATION</b>
                <br/>We process personal data in the first place to be able to offer the Services to our Customers and to run, maintain and develop our business. We also process personal data to perform our contractual obligations towards Customers and to comply with legal or financial obligations. Left Diamonds LLC also collects and use user personal information for the following purposes:
                <br/>&nbsp; 1) To improve customer service
                <br/>&nbsp; 2) The information provided helps us respond to customer service requests and support needs more efficiently.
                <br/>&nbsp; 3) To personalize user experience
                <br/>&nbsp; 4) We use information in the aggregate to understand how our users as a group use the services and resources provided on our Site.
                <br/>&nbsp; 5) To improve our Site
                <br/>&nbsp; 6) We use feedback provided to improve our products and services.
                <br/>&nbsp; 7) To process payments
                <br/>&nbsp; 8) We use the information users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.
                <br/>&nbsp; 9) To send users information they agreed to receive about topics we think will be of interest to them.
                <br/>&nbsp; 10) To send periodic emails
                <br/>We use the email address to send User information and updates pertaining to their order. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.
                <br/><b>INFORMATION WE COLLECT</b>
                <br/>Our Website collects information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device (”personal information”). In particular, our Platform has collected the following categories of personal information from its consumers within the last twelve (12) months:
                <br/>&nbsp; 1. Category A: Identifiers
                <br/>&nbsp;&nbsp;&nbsp;a. Examples: device Information, Internet Protocol address, email address, or other similar identifiers.
                <br/>&nbsp;&nbsp;&nbsp;b. Collected:<b>YES</b>
                <br/>&nbsp; 2. Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).
                <br/>&nbsp;&nbsp;&nbsp;c.Examples: A name, address, telephone number, credit card number, debit card number, or any other financial information.
                <br/>&nbsp;&nbsp;&nbsp;d. Collected:<b>YES</b>
                <br/>&nbsp; 3. Category C: Protected classification characteristics under California or federal law.
                <br/>&nbsp;&nbsp;&nbsp;e. Examples: Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental disability, sex (including gender, gender identity, gender expression, pregnancy or childbirth and related medical conditions), sexual orientation, veteran or military status, genetic information (including familial genetic information).
                <br/>&nbsp;&nbsp;&nbsp;f. Collected:<b>NO</b>
                <br/>We obtains the categories of personal information listed above from the following categories of sources:
                <br/>&nbsp;1. Directly from you. For example, from forms you complete on our Platform.
                <br/>&nbsp;2. Indirectly from you. For example, from observing your actions on our Platform or interactions with our advertisers.
                <br/>&nbsp;3. Independently from others. For example, from web scraping tools searching on Google, Yelp etc.
                <br/><b>COOKIES, AUTOMATIC DATA COLLECTION AND RELATED TECHNOLOGIES</b>
                <br/>Our Application and Site uses “cookies” to enhance User experience. A User’s phone or web browser uses cookies for record-keeping purposes and sometimes to track information about them. We collect cookies or similar tracking technologies. This means information that our website’s server transfers to your phone or computer. This information can be used to track your session on our services. Cookies will also be used to customize our website content for you as an individual. 
                <br/><b>DISABLING COOKIES</b>
                <br/>Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version. Details on how to review your cookie settings and disable cookies on the most popular browsers are given on their respective websites.
                <br/><b>INFORMATION WE SHARE</b>
                <br/>We share information with third parties for those limited purposes provided that users have given us permission. This information is share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes of offering discounts and ways to redeem such discounts. 
                <br/><b>PAYMENT TRANSACTIONS</b>
                <br/>Financial transactions relating to our website and Application will be handled by our payment services providers. We will share transaction data with our payment services providers only to the extent necessary for the purposes of processing your payments, refunding such payments and dealing with complaints and queries relating to such payments and refunds.
                <br/><b>THIRD PARTY PAYMENT PROCESSORS</b>
                <br/>We may use third party payment processors such as Stripe. Google Pay, and Apple Pay. We do not control third parties’ collection policies or use of your information. Please see their privacy policy concerning any practice. 
                <br/>We may your personal data to any member of our group of companies, this means our subsidiaries, our ultimate holding company and all its subsidiaries insofar as reasonably necessary for the purposes, and on the legal bases, set out in this policy.
                <br/>We may inquiry data to one or more of those selected third-party suppliers of services via APIs identified on our website for the purpose of enabling them to connect your account with their Services. Each such third party will act as a data controller in relation to the inquiry data that we supply to it.  Each such third party will supply to you a copy of its own privacy policy, which will govern that third party's use of your personal data.
                <br/><b>CATEGORIES OF PERSONAL INFORMATION LEFT DIAMONDS LLC COLLECTS</b>
                <br/>Personally Identifiable Information is information that identifies a specific person. When you engage in certain activities via the Company Service, including but not limited to creating an account, sending feedback, or otherwise participating in the Company Service (collectively, “Identification Activities”), we will ask you to provide certain information about yourself. We also collect the following:
                <br/>
                <ul>
                    <li>Identity Data</li>
                    <li>Contact Data</li>
                    <li>Technical Data</li>
                    <li>Usage Data</li>
                    <li>Transaction Data</li>
                    <li>Financial Data</li>
                    <li>Assessment Data</li>
                    <li>Profile Data</li>
                    <li>Marketing and Communications Data</li>
                </ul>
                <br/>If you elect to engage in an Identification Activity we will ask you to provide us with certain personal information about yourself, such as your name, address (including zip code), email address, credit card information, telephone number and/or any other information you provide to us, to process your transaction, send communications about them to you, and populate forms for future transactions.  
                <br/>When you enroll in the Company Service, we will also ask you to provide us with additional information, such as credit card information. Depending on the Identification Activity, some of the information we ask you to provide will be identified as mandatory and some identified as voluntary.  If you do not provide mandatory information for an Identification Activity, you will not be permitted to engage in that Identification Activity with the Company Service.  Depending on the Identification Activity, Company might not re-ask you for Personally Identifiable Information if such are already stored with us.  If you enroll in the Company Service through a third party (such as Facebook or Google) then Company will receive Personally Identifiable Information from such third party and by using the Company Service, you consent to such receipt of Personally Identifiable Information and its use pursuant to this Privacy Policy by Company.
                <br/><b>DATA RETENTION</b>
                <br/>Our data retention policies and procedure are designed to help ensure that we comply with our legal obligations in relation to the retention and deletion of personal data. Personal data that we process for any purpose or purposes shall be kept until such time as we receive a request for deletion from you. This time period shall not exceed eighteen (18) months.
                <br/>Notwithstanding the other provisions, we will retain your personal data where such retention is necessary for compliance with a legal obligation to which we are subject, or in order to protect your vital interests or the vital interests of another natural person.
                <br/><h4>YOUR LEGAL RIGHTS</h4>
                <br/>Your principal rights under data protection law are:
                <br/>&nbsp;&nbsp;(a) The right to access;
                <br/>&nbsp;&nbsp;(b) The right to rectification;
                <br/>&nbsp;&nbsp;(c) The right to erasure;
                <br/>&nbsp;&nbsp;(d) The right to restrict processing;
                <br/>&nbsp;&nbsp;(e) The right to object to processing;
                <br/>&nbsp;&nbsp;(f) The right to data portability;
                <br/>&nbsp;&nbsp;(g) The right to complain to a supervisory authority; and
                <br/>&nbsp;&nbsp;(h)  The right to withdraw consent
                <br/>You have the right to confirmation as to whether or not we process your personal data and, where we do, access to the personal data, together with certain additional information. That additional information includes details of the purposes of the processing, the categories of personal data concerned and the recipients of the personal data. Providing the rights and freedoms of others are not affected, we will supply to you a copy of your personal data.
                <br/>You have the right to have any inaccurate personal data about you rectified and, taking into account the purposes of the processing, to have any incomplete personal data about you completed.
                <br/>In some circumstances you have the right to the erasure of your personal data without undue delay, and at the latest within one month of receiving your valid request. Those circumstances include: the personal data are no longer necessary in relation to the purposes for which they were collected or otherwise processed; you withdraw consent to consent-based processing; you object to the processing under certain rules of applicable data protection law; the processing is for direct marketing purposes; and the personal data have been unlawfully process. However, there are exclusions of the right to erasure. The general exclusions include where processing is necessary: for exercising the right of freedom of expression and information; for compliance with a legal obligation; or for the establishment, exercise or defense of legal claims.
                <br/>Where processing has been restricted on this basis, we may continue to store your personal data. However, we will only otherwise process it: with your consent; for the establishment, exercise or defense of legal claims; for the protection of the rights of another natural or legal person; or for reasons of important public interest.
                <br/>You have the right to object to our processing of your personal data for direct marketing purposes (including profiling for direct marketing purposes). If you make such an objection, we will cease to process your personal data for this purpose.
                <br/>If you consider that our processing of your personal information infringes data protection laws, you have a legal right to lodge a complaint with a supervisory authority responsible for data protection.
                <br/><b>HOW TO OPT OUT OF FUTURE COMMUNICATIONS</b>
                <br/>Company offers various opportunities to opt-out of future communications. Firstly, Customers and End Users can opt to delete the application on their phone. You may also submit a request to us via email in the process below:
                <br/>If you are a Customer, please submit an email to us at contact@momnpophub.com. We will only use personal information provided in an opt-out request to review and comply with the request. 
                <br/>If you are an End User, you may request to opt out of marketing emails by emailing us at contact@momnpophub.com. Company however does not revokes transactional purchases or transactional emails unless requested by the user above.
                <br/><b>SECURITY OF YOUR INFORMATION</b>
                <br/>We employ commercially reasonable security measures to protect data and seek to partner with companies that do the same, we cannot guarantee the security of any information transmitted to or from or via the Company Service, and we are not responsible for the actions of any third parties that may receive any such information. Unauthorized entry or use, hardware or Application failure, and other factors, may compromise the security of user information at any time.
                <br/>You can access your Personally Identifiable Information via the Company Service with your password and username. This password is encrypted. We advise against sharing your password with anyone.
                <br/><b>BREACH OF INFORMATION</b>
                <br/>To the extent that Company provides commercially reasonable security measures, as outlined above, Customers and End Users agree that Company shall not be liable for any breach caused by a criminal third party. 
                <br/><b>CHILDREN'S PRIVACY</b>
                <br/>If you are a minor, please do not provide us or other website visitors with any personal information and do not use this website. We do not knowingly provide services or sell products to children. If we learn we have collected or received personal information from a child under 18, we will delete that information. If you believe we have any information from or about a child under 18, please contact us at contact@momnpophub.com.
                <br/><b>EXTERNAL LINKS</b>
                <br/>Users will find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services will have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website’s own terms and policies.
                <br/><b>THIRD PARTY INTEGRATIONS</b>
                <br/>Customer hereby acknowledges that the Application may contain third party software that may require additional notices or are subject to additional terms and conditions. Customers, and End Users, herby indemnify Company against any disruption due to a third party integration. If there are any conflicts between this agreement and the additional terms or conditions governing third party software, those additional terms and conditions will only govern the third party software.
                <br/><b>CONTACT INFORMATION</b>
                <br/>To ask questions or comment about this privacy policy and our privacy practices, contact us at:
                <br/>contact@momnpophub.com
            </p>
        </div>
        </>
    );
}
export default Privacy;