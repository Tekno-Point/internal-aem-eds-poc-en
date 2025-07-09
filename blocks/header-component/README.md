# Header Component

The Header Component is a navigation list that displays dropdown content when a user hovers over a navigation item. This component is designed to be visually stunning and user-friendly, providing a seamless experience for users to explore different sections of the website.

## Fields

| Field Name       | Component Type | Description                                      |
|------------------|----------------|--------------------------------------------------|
| navTitle         | text           | The title of the navigation item.               |
| navLink          | text           | The URL the navigation item links to.           |
| dropdownContent  | richtext       | The content to be displayed in the dropdown.     |

## Sample JSON

```json
{
  "navTitle": "Accounts",
  "navLink": "/personal-banking/accounts",
  "dropdownContent": "<div class='hd-bx'><p class='hd-bx-h4'>IDFC FIRST Bank Accounts</p><a href='/personal-banking/accounts' class='link'>View all Accounts</a></div><div class='menu-cardList'><div class='grdiantCard'><a href='/personal-banking/accounts/savings-account'><div class='title'>Savings Account</div></a></div></div>"
}
```

## Usage Notes

- Ensure that the `dropdownContent` field contains valid HTML to be displayed correctly in the dropdown.
- The component uses CSS for styling and JavaScript for handling hover effects and dropdown visibility.