import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory,useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import UserContext from "../../contexts/userContext";
import './term.css';
const Term = () => {
    return(
        <>
        <div class="term-padding">
            <h1>TERMS AND CONDITIONS</h1>
            <p>
                <b>Last Updated: June 14, 2021</b>
                <br/>These Terms and Conditions govern the manner in which Customers and End Users (each, a “User”, “You”) may use Left Diamonds, LLC.’s (“Company” “Left Diamond”) www.momnpophub.com website (“Site”) and Mom N Pop Hub (“Application”) and collectively (“services”). These terms along together with the Privacy Policy, govern those persons’ access to our Application and websites.<br/>
                By accessing or using the Services, you agree to comply with and be bound by the Terms and Conditions set forth in this agreement (the "Terms"), whether or not you become a registered user of the Service. Failure to use the Service in accordance with these Terms and Privacy Policy may subject you to civil and criminal penalties.<br/>
                <b>IF YOU DO NOT WANT TO AGREE TO THESE TERMS AND CONDITIONS OR THE PRIVACY POLICY, YOU MUST NOT ACCESS OR USE THE WEBSITE. ELECTRONIC CHARTS, BASED ON OFFICIAL DATA AS WELL AS ON OTHER SOURCES, PROVIDE ASSISTANCE FOR NAVIGATION AND ARE DESIGNED TO FACILITATE THE USE OF OFFICIAL CHARTS AND NOT TO REPLACE THEM. YOU ARE RESPONSIBLE FOR YOUR LOCATION.</b><br/>
                <b>Company Services</b><br/>
                Left Diamonds, LLC provides online directory exclusive to small businesses “Customers” called Mom N Pop Hub “Service.” Customers may sign up their small businesses, offer discounted deals, invite new and existing “End Users”, or participate and interact with other customers’ deals.  <br/>
                <b>Account</b><br/>
                In order to access certain features of the Service, and to post any content on the Service, you will have to create a Left Diamonds, LLC. account and become a member. The Service is not intended to be used by children without involvement and approval of a parent or guardian. If you are under the age of 18, you are not permitted to subscribe to Left Diamonds, LLC. or provide your personal information to the Service.
Accounts may only be set up by an authorized representative of the individual that is the subject of the account. We do not review accounts for authenticity, and are not responsible for any unauthorized accounts that may appear on the Service. If you register with us or create an account, you are solely responsible and liable for the security and confidentiality of your access credentials and for restricting access to your Device and for all activity under your account. 
You will immediately notify us here of any unauthorized use of your account, password, or username, or any other breach of security. You will not sell, transfer, or assign your account or any account rights.<br/>
            
            <b>Per Transaction or Subscription</b><br/>
            Left Diamonds, LLC. may charge Customers fees to access certain features and functionalities of the Services set to subscription structure or on a per transaction basis. You can become a member by subscribing to the Service on a monthly or annual basis, or such other periods that we may offer from time to time. The applicable fees are set out on our website. We reserve the right to revise and update the applicable fees for Subscriptions (including the fees set out on the relevant Application stores where you subscribe to the Service), and the different Subscription packages available, at any time.  Any such revision or updates to the fees will apply prospectively to any Subscription entered into following the effective date of the fee revision or update. Customers authorize us to store your payment method(s) and to automatically charge your payment method(s) every month or annually (as applicable) at the then-current rate for your plan, plus applicable taxes.<br/>
            <b>Automatic Renewal of Subscription</b><br/>
            Customer Subscriptions will automatically renew unless you cancel at least 24 hours prior to the end of the current billing period. After cancellation, you will still be entitled to access the Subscription services for the remainder of the duration that you have paid for.<br/>
            <b>Cancellation</b><br/>
            If you cancel a paid plan, the cancellation will become effective at the end of the monthly billing cycle. We do not offer refunds. Any refunds offered between Customers and End Users is the responsibility of the users.<br/>
            <b>Deletion</b><br/>
            You may delete your account at any time. Accounts on paid plans will remain active until the end of the term unless you explicitly ask us to delete it when you cancel your paid plan.<br/>
            <b>Cash for Value</b><br/>
            Company does not have any cash value for these deals. If a Customer offers a cash for value deal, Customers and End Users agree to indemnify Company against any dispute.<br/>
            <b>Refund Policy</b><br/>
            NO REFUND OF FEES WILL BE MADE BY COMPANY TO ANY CUSTOMER OR END USER. Refunds may be given from Customers to End Users. Both Customers and End Users acknowledge and indemnify Company from any disputes or refunds.<br/>
            <b>Taxes</b><br/>
            Customer and End Users both acknowledge that they are responsible for their taxes from any transaction which occurs on the application or site. Company shall not be held liable for any Federal, state and other material tax returns, withholdings, and/or reports required to be filed, and/or need to be paid assessments, fees and other governmental charges levied or imposed by a statute or government agency.<br/>
            <b>Your Personal Data Rights</b><br/>
            How we use your data and your data privacy rights are covered under our Privacy Policy (Insert Web address) and are hereby integrated into these Terms and Conditions. If you have questions concerning your data rights and our obligations under the federal law please consult our Privacy Policy. Our Privacy Policy covers a variety information about your data rights including but not limited to our obligations and rights as a processor, obligations and rights of the controller, subject matter of data processing, duration of data processing, nature and purpose of data processing, type of personal data collected, categories of data subjects collected, and special categories of personal data collected.
            <br/>
            <b>USERS</b>
            <br/>
            In using the Services, you must behave in a civil and respectful manner at all times.  Although we have no obligation to screen, edit or monitor User Content, we reserve the right, and have absolute discretion, to remove, screen or edit User Content posted or stored on the websites, applications and services at any time and for any reason, and you are solely responsible for creating backup copies of and replacing any User Content you post or store on the websites, applications and services at your sole cost and expense.
            <br/>
            By using the interactive features and areas of the websites, applications and services, you further agree not to create, post, share or store any of the following:
            <br/>
            <ul>
                <li>Content that may violate any applicable Federal, State, Local, or International law or regulation;</li>
                <li>User Content that would constitute, encourage or provide instructions for a criminal offense, violate the rights of any party or otherwise create liability or violate any local, state, national or international law;</li>
                <li>User Content that may infringe any patent, trademark, trade secret, copyright or other intellectual or proprietary right of any party;</li>
                <li>User Content that contains any viruses, corrupted data or other harmful, disruptive or destructive files or content; or</li>
                <li>User Content that, in our sole judgment, is objectionable or that restricts or inhibits any other person from using or enjoying the Sites or Services, or that may expose Company or others to any harm or liability of any type.</li>
            </ul>
            Although we have no obligation to screen, edit or monitor User Content, we reserve the right, and have absolute discretion, to remove, screen or edit User Content posted or stored on the Websites, applications and services at any time and for any reason, and you are solely responsible for creating backup copies of and replacing any User Content you post or store on the Websites, applications and services at your sole cost and expense. We do not and cannot authenticate reviews. We do not edit or correct content. 
            <br/>
            The User also undertakes to use the Platform solely in accordance with this Agreement and solely for purposes of using the Services. The User undertakes not to:
            <br/>
            <ul>
                <li>Transfer or resell the Services, the Premium Services or his or her right to use the Platform to others;</li>
                <li>Tamper with or operate on the Platform hardware without Company’ intervention and authorization;</li>
                <li>Use the Platform to create or incorporate other datasets correlated to the maps to be used for a service which is similar or identical to the Service or Premium Services;</li>
                <li>Spread viruses, malware or any other technology designed to harm the Platform, the Websites, applications and services, the User’s devices, to breach Company’ rights or the rights of other Users or in any way to hinder or disturb use of the Services or the Premium Services by other Users;</li>
                <li>Circumvent instruments prepared by Company to ensure the security of the Platform and prevent intrusions or access by unsolicited automated users (by way of example, robots, spam, spiders);</li>
                <li>Copy, download, duplicate, distribute, disseminate or in any way use – including partially – images, distinctive marks, text and content belonging to Company or in any way found on the Platform;</li>
                <li>Export any information outside the Platform, aside from those cases expressly governed by this Agreement.</li>
            </ul>
            Should Company have reason to believe, at its own final discretion, that the User has engaged in actions which may give rise to technical problems or legal liability or which run counter to the provisions of the Agreement, Company may, by way of example, limit, suspend or interrupt usability of the Services, and the Account, prohibiting access to the Application and Company may adopt technical (including the removal of unlawful content) and legal measures in order to prevent the User from using the Services and the Premium Services.
            <br/>
            <b>Content Rights and Licenses</b><br/>
            The Websites, applications and services, and all Content other than User Content available on the websites, applications and services or used to create and operate the Websites, applications and services, is and remains the property of Company, and is protected under the Copyright Act of 1976, as amended, and other intellectual property laws of the United States and any foreign jurisdiction where the Websites, applications and services are accessed, and all rights to the Websites, applications and services, such Content, and such Application are expressly reserved. 
            <br/>All trademarks and service marks, whether registered or unregistered, as well as product names and company names or logos, displayed or mentioned on the Websites, applications and services are the property of their respective owners. 
            <br/>You must not use such marks without the prior written permission of the owner of the marks. Reference to any products, services, processes, or other information, by trade name, trademark, manufacturer, supplier, or otherwise does not constitute or imply endorsement, sponsorship, or recommendation thereof by Company.
            <br/>
            <b>Limited License for Services</b>
            <br/>
            User Content is and remains that User’s property, and Company’s only right to that User Content is the limited licenses to it granted in these Terms and Conditions. Company grants you a limited, non-exclusive license to access and use the Services for your own personal and commercial purposes. This license is personal to you and may not be assigned or sublicensed to anyone else. Except as expressly permitted by Company in writing, you will not reproduce, redistribute, sell, create derivative works from, decompile, reverse engineer, or disassemble the Services. Nor will you take any measures to interfere with or damage the Services. All rights not expressly granted by Company are reserved.
            <br/>Company may revoke this license at any time for any reason or no reason, and shall not be liable to any User for any purported interference with business or contractual relations, in tort or otherwise.
            <br/>
            <b>Intellectual Property</b>
            <br/>
            Users may not engage in any activity on or through the Application, including transmitting or using User Content that infringes or otherwise makes unauthorized use of another party’s copyright, trademark, or other intellectual property or proprietary rights. 
            <br/>We will respond to legitimate requests made pursuant to the Online Copyright Infringement Liability Limitation Act of the Digital Millennium Copyright Act (17 U.S.C. § 512) ("DMCA") and trademark law, and we retain the right to remove Content from the websites, applications and services that Company believes in good faith infringes on any third party’s intellectual property rights upon notice from the owner of such intellectual property, or their agent. 
            <br/>
            <b>Reviews</b>
            <br/>
            We may provide you areas on the Websites, applications and services to leave reviews or ratings. When posting a review, you must comply with the following criteria: (1) you should have firsthand experience with the person/entity being reviewed; (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hate language; (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability; (4) your reviews should not contain references to illegal activity; (5) you should not be affiliated with competitors if posting negative reviews; (6) you should not make any conclusions as to the legality of conduct; (7) you may not post any false or misleading statements; and (8) you may not organize a campaign encouraging others to post reviews, whether positive or negative. We may accept, reject, or remove reviews in our sole discretion. 
            <br/>
            <b>Apple and Android Devices</b>
            <br/>
            The following terms apply when you use a mobile application obtained from either the Apple Store or Google Play (each an “App Distributor”) to access the Websites, applications and services: (1) the license granted to you for our mobile application is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s Terms and Conditions; (2) we are responsible for providing any maintenance and support services with respect to the mobile application as specified in the terms and conditions of this mobile application license contained in these Terms and Conditions or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the mobile application; (3) in the event of any failure of the mobile application to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, may refund the purchase price, if any, paid for the mobile application, and to the maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever with respect to the mobile application; (4) you represent and warrant that (i) you are not located in a country that is subject to a U.S. government embargo, or that has been designated by the U.S. government as a “terrorist supporting” country and (ii) you are not listed on any U.S. government list of prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement when using the mobile application, e.g., if you have a VoIP application, then you must not be in violation of their wireless data service agreement when using the mobile application; and (6) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application license contained in these Terms and Conditions, and that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile application license contained in these Terms and Conditions against you as a third-party beneficiary thereof.
            <br/>
            <b>Social Media</b>
            <br/>
            As part of the Application, you may link your account with online accounts you have with third-party service providers. By granting us access to any Third-Party Accounts, you understand that (1) we may access, make available, and store (if applicable) any content that you have provided to and stored in your Third-Party. Note that your relationship with the third-party service providers associated with your third-party accounts is governed solely by your agreement(s) with such third-party service providers. We make no effort to review any Social Content for any purpose, including but not limited to, for accuracy, legality, or non-infringement, and we are not responsible for any Social Network Content. 
            <br/>
            <b>Advertisers</b>
            <br/>
            We provide space to advertisers, however we do not regulate advertisers. If you are an advertiser, you shall take full responsibility for any advertisements you place on the App and any services provided on the Websites, applications and services or products sold through those advertisements. Additionally, as an advertiser, you represent that you possess all rights and authority to place advertisements on the App, including, intellectual property rights.
            <br/>
            <h4>DISPUTE PROCESS</h4>
            THESE CLAUSES CONTAIN MANY OF YOUR RIGHTS IN CASE OF A DISPUTE, PLEASE REVIEW THESE RIGHTS CAREFULLY.
            <br/><b>Assumption of Risk</b>
            <br/>
            You are solely responsible for ensuring that your use of the Services complies with applicable law and does not violate the rights of any third party, including, without limitation, intellectual property rights. You assume all liability for any claims, suits or grievances filed against you, including, but not limited to, all damages related to your use of the Websites, applications and services.
            <br/>
            <b>Process</b>
            <br/>
            For Complaints between Company:
            <br/><b>1) CONTACT US</b> - You agree to contact us with your complaint prior to filing for any arbitration.
            <br/><b>2) FILE COMPLAINT</b> - You and Left Diamonds, LLC. agree that any dispute must be commenced or filed by you or Left Diamonds, LLC. within one (1) year of the date the dispute arose, otherwise the underlying claim is permanently barred (which means that you and Left Diamonds, LLC. will no longer have the right to assert such claim regarding the dispute).
            <br/><b>3) ARBITRATION</b>- You and Left Diamonds, LLC. agree that (a) any arbitration will occur in the State of Tennessee, (b) arbitration will be conducted confidentially by a single arbitrator in accordance with the rules of the Judicial Arbitration and Mediation Services (“JAMS”), which are hereby incorporated by reference, and (c) that the state or federal courts of the State of Tennessee and the United States, respectively, have exclusive jurisdiction over any appeals and the enforcement of an arbitration award. You may also litigate a Dispute in the small claims court located in Shelby county, TN if the Dispute meets the requirements to be heard in small claims court.
            <br/>&nbsp;&nbsp; a) Cost of Arbitration and legal costs. Up until the end of arbitration, both parties shall pay their own legal and any other fees associated with arbitration/ litigation fees. After decision, the complainant shall reimburse all arbitration and legal costs to the company (Left Diamonds LLC.) in the scenario arbitration is in favor of Left Diamonds LLC. 
            <br/><b>California Civil Code Section 1789.3 Compliance</b>
            <br/>Pursuant to California Civil Code Section 1789.3, any questions about pricing, complaints, or inquiries about Left Diamonds, LLC. must be addressed to our agent for notice and sent via certified mail to that agent. For our agent’s most current contact information, please send a request to contact@momnpophub.com.
            <br/>California websites users are entitled to the following specific consumer rights notice: The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs.
            <br/>
            <b>Third Party Integration</b>
            <br/>In providing the Service, Left Diamonds, LLC. makes available various third party tools to process payments (i.e. Stripe). Left Diamonds, LLC. is not responsible for and cannot be held liable for the performance of any third party services, the security of their service, or their collection or use of any of your information.
            <br/><b>Disclaimer of Warranties</b>
            <br/>
            You understand and agree that your use of the Websites, applications and/or the Services is at your sole risk. The Services are provided on an “as is” and “as available” basis without warranties or conditions of any kind, either express or implied (to the maximum extent permitted by applicable law).
            <br/>To the maximum extent permitted by applicable law, the Company expressly disclaims all warranties and conditions including, without limitation, warranties and conditions of satisfactory quality, merchantability, and fitness for a particular purpose.
            <br/>The Company makes no warranty as to the accuracy, completeness or reliability of any materials, information or data available through, or the performance of, the Websites and/or the Services.
            <br/>You acknowledge and agree that any material downloaded or otherwise obtained through the use of the Application, the Websites and/or the Services is at your own risk and that you will be solely responsible for any damage to your computer, mobile phone or other device or any loss of data resulting from downloading or obtaining such material.
            <br/>Some jurisdictions do not allow the disclaimer of implied warranties. In such jurisdictions, the Company expressly disclaims all warranties and conditions to the maximum extent permitted by applicable law.
            <br/>We make no warranty whatsoever with respect to the services, including any (a) warranty of merchantability; or (b) warranty of fitness for a particular purpose; or (c) warranty of title; or (d) warranty against infringement of intellectual property rights of a third party; whether express or implied by law, Course of dealing, Course of performance, usage of trade or otherwise.
            <br/>
            <b>Limitation Of Liability</b>
            <br/>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WHATSOEVER SHALL EITHER LEFT DIAMONDS, LLC. OR ITS AFFILIATES, OR THEIR RESPECTIVE EMPLOYEES, OFFICERS, SHAREHOLDERS, AGENTS, LICENSORS OR REPRESENTATIVES, NOR CUSTOMER OR ITS AFFILIATES, OR THEIR RESPECTIVE EMPLOYEES, OFFICERS, SHAREHOLDERS, AGENTS, LICENSORS OR REPRESENTATIVES, BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL, PUNITIVE OR EXEMPLARY DAMAGES, OR FOR ANY LOSS OF PROFITS OR REVENUE, INCLUDING BUT NOT LIMITED TO LOSS OF SALES, DATA, PROFIT, REVENUE, GOODWILL, BUSINESS INTERRUPTION, LOSS OF INFORMATION OR UNAUTHORIZED ACCESS TO INFORMATION AND THE LIKE, EVEN IF EITHER PARTY OR AN AFFILIATE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL EITHER PARTY OR ITS AFFILIATES BE LIABLE TO THE OTHER PARTY FOR AN AMOUNT IN EXCESS OF THE TOTAL MONETARY AMOUNT PROCESSED OR RECEIVED BY ANY PARTY IN AN ORDINARY TRANSACTION.
            <br/>
            <b>Indemnification</b>
            <br/>To the fullest extent permitted by applicable law, you agree to indemnify, defend and hold harmless Company, and our employees, contractors, representatives, and assigns (individually and collectively, the “Left Diamonds, LLC. Parties”), from and against all actual or alleged claims, damages, awards, judgments, losses, liabilities, obligations, penalties, interest, fees, expenses and costs of every kind and nature whatsoever, whether known or unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract or otherwise (collectively, “Claims”), including, but not limited to, damages to property or personal injury, that are caused by, arise out of or are related to 
            <br/>&nbsp;&nbsp; a) Any use or misuse of the Sites, Application, or Services by you or any third party service you authorize to access or use such Services; 
            <br/>&nbsp;&nbsp; b) Your violation of these terms, and your violation of the rights of another, or; 
            <br/>&nbsp;&nbsp; c) Any dispute with another user of the Sites, Application, or Services.
            <br/>You agree to promptly notify Left Diamonds, LLC. of any third party Claims, cooperate with Left Diamonds, LLC. Parties in defending such Claims and pay all fees, costs and expenses associated with defending such Claims (including, but not limited to, attorneys’ fees and expenses, court costs, costs of settlement and costs of pursuing indemnification and insurance). 
            <br/>You further agree that Left Diamonds, LLC. Parties shall have control of the defense or settlement of any third party Claims. This indemnity is in addition to, and not in lieu of, any other indemnities set forth in a written agreement between you and Company.
            <br/><b>Entire Agreement</b>
            <br/>These Terms and Conditions incorporate by reference any notices contained on the Sites, including within the Privacy Policy, and constitute the entire agreement with respect to access to and use of the Sites, Services, and Content.
            <br/><b>Force Majeure</b>
            <br/>A “Force Majeure Event” means an event beyond the control of a Party, which by its nature could not have been foreseen by such Party, or, if it could have been foreseen, was unavoidable and includes, without limitation, acts of God, storms, floods, riots, fires, cloud service provider performance failures and/or power outages, power outages, sabotage, civil commotion or civil unrest, interference by civil or military authorities, and acts of war (declared or undeclared). Continued performance of a Service may be suspended immediately to the extent caused by Force Majeure. 
            <br/>The Party claimin   g suspension of a Service due to Force Majeure will give prompt notice to the other of the occurrence of the event giving rise to the suspension and of its nature and anticipated duration. The Parties shall cooperate with each other to find alternative means and methods for the provision of the suspended Service. Without limiting the generality of the foregoing, neither Party shall be under any liability for failure to fulfill any obligation under these Terms, so long as and to the extent to which the fulfillment of such obligation is prevented, frustrated, hindered or delayed as a consequence of circumstances of Force Majeure.
            <br/><b>Severability</b>
            <br/>If any provision of these Terms and Conditions is deemed unlawful, void, or unenforceable by a court of law exercising proper jurisdiction, that provision shall be deemed severed from the remaining provisions and shall not affect their validity and enforceability.
            <br/><b>No Waiver</b>
            <br/>No waiver of any provision hereof shall be valid unless in writing signed by the parties. Any failure to enforce any right or remedy hereunder shall not operate as a waiver of the right to enforce such right or remedy in the future or of any other right or remedy.
            <br/><b>No Class Actions</b>
            <br/>You and Left Diamonds, LLC. agree that there will be no class arbitration or arbitration in which an individual attempts to resolve a Dispute as a representative of another individual or group of individuals.
            <br/><b>Governing Law and Venue – Tennessee</b>
            <br/>Any Dispute between the parties that is not subject to arbitration, shall be resolved in the state or federal courts of the State of Tennessee and the United States, respectively, sitting in the State of Tennessee
            <br/><b>Investigations; Cooperation with Law Enforcement</b>
            <br/>Left Diamonds, LLC. reserves the right, without any limitation, to: (i) investigate any suspected breaches of its Service security or its information technology or other systems or networks, (ii) investigate any suspected breaches of these Terms and any applicable Additional Terms, (iii) investigate any information obtained by Left Diamonds, LLC. in accordance with its Privacy Policy in connection with reviewing law enforcement databases or complying with criminal laws, (iv) involve and cooperate with law enforcement authorities in investigating any of the foregoing matters, (v) prosecute violators of these Terms and any applicable Additional Terms, and (vi) discontinue the Service, in whole or in part, or, suspend or terminate your access to it, in whole or in part, including any user accounts or registrations, at any time, without notice, for any reason and without any obligation to you or any third party.
            <br/><b>Electronic Notices</b>
            <br/>YOU AGREE TO THIS LICENSE ELECTRONICALLY. YOU AUTHORIZE US TO PROVIDE YOU ANY INFORMATION AND NOTICES REGARDING THE SERVICE (“NOTICES”) IN ELECTRONIC FORM. WE MAY PROVIDE NOTICES TO YOU (1) VIA E-MAIL IF YOU HAVE PROVIDED US WITH A VALID EMAIL ADDRESS OR (2) BY POSTING THE NOTICE ON A WEBSITE DESIGNATED BY US FOR THIS PURPOSE. 
            <br/>The delivery of any Notice is effective when sent or posted by Left Diamonds, LLC. regardless of whether you read the Notice or actually receive the delivery. You can withdraw your consent to receive Notices electronically by discontinuing your use of the Service.
            <br/><b>How to Contact Us!</b>
            <br/>contact@momnpophub.com

            </p>
            </div>
        </>
    )
}
export default Term;