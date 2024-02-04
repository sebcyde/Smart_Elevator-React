# Smart Elevator Control Panel

Welcome to the Smart Elevator Control Panel application! This React-based control panel provides an intuitive interface for users to interact with a network of elevators efficiently.

## User Journey

As a user interacting with the control panel:

1. **Selecting a Floor:**
   - Each elevator has its own control panel, displaying the floors that elevator services.
   - Press the RED Button next to an elevator to display its contrrol panel, revealing its available floors.
   - Choose a floor to make a POST request to that elevator, adding the chosen floor to its queue of floors to visit. 
   - On each control panel, previously selected floors are shown in yellow, unselected floors are shown in red.
   - 
   
2. **Elevator Information:**
   - Selecting a destination floor on a control panel will close the control panel.
   - A number will then be shown via the update bar at the bottom of the screen stating which number elevator to take.
   - An arrow will also appear indicating the direction of the chosen elevator.

## Features

- **Sequential Usage:**
  - The control panel supports multiple passengers selecting different destinations in quick succession.

- **Flexible Destination Selection:**
  - Users can freely choose any destination floor that a particular elevator services.

- **Live Updates:**
  - Previously requested destinations are displayed on each elevators control panel in YELLOW until the elevator arrives and leaves. Unselected floors are shown in RED.

- **Integration with Smart Elevator API:**
  - Utilizes the provided API to request elevator destinations, fetch elevator statuses, and retrieve elevator configurations.

- **Multiple Control Panels:**
  - Supports the presence of multiple control panels outside a bank of elevators.

- **Multi-Elevator Environment:**
  - Accommodates scenarios where there are multiple elevators per floor, each serving different floors.

- **Dynamic Elevator Interaction:**
  - Users can click on open elevators to travel to the elevator's next floor.
  - Open elevators are visually represented by the presence of people inside and an illuminated light.

- **Update Bar:**
  - A dynamic update bar at the bottom keeps users informed about ongoing actions, such as which lift to take and reminders of previous actions.

## API Endpoints

### Locations of API endpoints to be replaced:

- **Request Elevator Destination:**
  - **Location** `/src/Functions/ApiEndpoints/ElevatorRequestEndpoint`
  - **POST** `/api/lift/request/`
  - Example Payload:
    ```json
    { "from_floor": 0, "to_floor": 5 }    
    ```
  - Example Response: 
    ```json
    { "lift": 4 }    
    ```

- **Request Elevator Status:**
  - **Location** `/src/Functions/ApiEndpoints/ElevatorStatusEndpoint`
  - **GET** `/api/lift/status/`
  - Example Response:
    ```json
    { "lifts": { 0: { "floor": 0, "destinations": [1, 5, 10] }, 1: { "floor": 0, "destinations": [1, 10] } } }
    ```

- **Request Elevator Configuration:**
  - **Location** `/src/Functions/ApiEndpoints/ElevatorConfigEndpoint`
  - **GET** `/api/lift/config/`
  - Example Response:
    ```json
    { "lifts": { 0: { "serviced_floors": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, 1: { "serviced_floors": [0, 7, 8, 9, 10] } } }
    ```

Feel free to explore the control panel and enjoy a smart and efficient elevator experience! If you have any questions or encounter issues, please refer to config or contact me.
