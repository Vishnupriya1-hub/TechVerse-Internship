import json
import os

FILE_NAME = "contacts.json"


def load_contacts():
    if not os.path.exists(FILE_NAME):
        return []

    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)
    except json.JSONDecodeError:
        return []


def save_contacts(contacts):
    with open(FILE_NAME, "w") as file:
        json.dump(contacts, file, indent=4)


def add_contact():
    name = input("Enter name: ").strip()
    phone = input("Enter phone number: ").strip()
    email = input("Enter email: ").strip()

    if name == "" or phone == "" or email == "":
        print("\n❌ All fields are required.")
        return

    contacts = load_contacts()

    contact = {
        "name": name,
        "phone": phone,
        "email": email
    }

    contacts.append(contact)
    save_contacts(contacts)

    print("\n✅ Contact added successfully!")


def view_contacts():
    contacts = load_contacts()

    if len(contacts) == 0:
        print("\nNo contacts found.")
        return

    print("\n========== CONTACT LIST ==========")

    for index, contact in enumerate(contacts, start=1):
        print(f"\nContact {index}")
        print(f"Name  : {contact['name']}")
        print(f"Phone : {contact['phone']}")
        print(f"Email : {contact['email']}")


def search_contact():
    keyword = input("Enter name to search: ").strip().lower()
    contacts = load_contacts()

    found = False

    for contact in contacts:
        if keyword in contact["name"].lower():
            print("\n✅ Contact Found")
            print(f"Name  : {contact['name']}")
            print(f"Phone : {contact['phone']}")
            print(f"Email : {contact['email']}")
            found = True

    if not found:
        print("\n❌ Contact not found.")


def update_contact():
    name = input("Enter contact name to update: ").strip().lower()
    contacts = load_contacts()

    for contact in contacts:
        if contact["name"].lower() == name:
            print("\nLeave blank to keep old value.")

            new_name = input("Enter new name: ").strip()
            new_phone = input("Enter new phone: ").strip()
            new_email = input("Enter new email: ").strip()

            if new_name:
                contact["name"] = new_name
            if new_phone:
                contact["phone"] = new_phone
            if new_email:
                contact["email"] = new_email

            save_contacts(contacts)
            print("\n✅ Contact updated successfully!")
            return

    print("\n❌ Contact not found.")


def delete_contact():
    name = input("Enter contact name to delete: ").strip().lower()
    contacts = load_contacts()

    updated_contacts = [
        contact for contact in contacts
        if contact["name"].lower() != name
    ]

    if len(updated_contacts) == len(contacts):
        print("\n❌ Contact not found.")
    else:
        save_contacts(updated_contacts)
        print("\n✅ Contact deleted successfully!")


def main():
    while True:
        print("\n===================================")
        print("        CLI CONTACT BOOK")
        print("===================================")
        print("1. Add Contact")
        print("2. View Contacts")
        print("3. Search Contact")
        print("4. Update Contact")
        print("5. Delete Contact")
        print("6. Exit")

        choice = input("\nEnter your choice: ").strip()

        if choice == "1":
            add_contact()
        elif choice == "2":
            view_contacts()
        elif choice == "3":
            search_contact()
        elif choice == "4":
            update_contact()
        elif choice == "5":
            delete_contact()
        elif choice == "6":
            print("\nThank you for using Contact Book!")
            break
        else:
            print("\n❌ Invalid choice. Please try again.")


main()