# Landing section order

James's review refers to the numbered sections on the landing page. The current order is:

| Position | Content | Previous section |
| --- | --- | --- |
| 01 | Hero | 01 |
| 02 | Product pathway | 02 |
| 03 | Practice | 05 |
| 04 | Services, followed by Insights in the same section | 04 + 07 |
| 05 | Reimbursement feature | 03 |
| 06 | Contact | 08 |

The standalone People panel (previous 06) is removed from the landing page. The Practice page and its verified team information remain available. The IndexRail tracks the six current section IDs.

## Responsive review

The landing page was inspected at 320px, 390px, 768px and 1440px, including the production build. At 320px and 390px, the Practice cards and merged Services/Insights section stack cleanly, the mobile menu opens with its five route links, and the document has no horizontal overflow. The production build exits successfully and the 17 route smoke checks pass. This visual review does not claim real-device or screen-reader certification.

- [Production Practice cards at 390px](verification/landing-practice-mobile-production.png)
- [Production Services-to-Insights transition at 390px](verification/landing-services-insights-mobile-production.png)
