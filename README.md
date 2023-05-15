# Conception Diagrams

## use case diagram :

---check conception folder---

## sequence diagram :

---check conception folder---

## activity diagram :

---check conception folder---

# Requirements and needs :

1. Monitoring Machine Stats:

- [ ] Once authenticated, the app should provide a screen to display real-time
      statistics and status of the machine.
- [ ] The app should fetch and display data such as production rate, machine
      speed, downtime, and any other relevant metrics.
- [ ] The statistics should be updated in real-time, reflecting the current
      state of the machine.

2. Timeline Data:

- [ ] The app should allow the user to request the timeline data for the
      machine.
- [ ] The timeline data should include a historical record of the machine's
      performance, including production rates, downtime events, and any other
      relevant information.
- [ ] The app should fetch and display the timeline data in a visually appealing
      and user-friendly manner.

3. Machine Fault Justification:

- [ ] The app should provide a feature for the user to provide justifications
      for machine faults.
- [ ] When a fault occurs, the app should prompt the user to enter a
      justification or select from predefined options.
- [ ] The justifications provided by the user should be stored and associated
      with the respective fault events.

4. Change Product:

- [ ] The app should allow the user to change the current product being
      manufactured by the machine.
- [ ] The user should be able to select the new product from a list of available
      options.
- [ ] Upon changing the product, the app should update the machine's settings
      accordingly.

5. Shift-Specific Timeline:

- [ ] When displaying the timeline data, the app should show shift-specific
      information based on the current shift of the operator.
- [ ] The day should be divided into three shifts (e.g., morning, afternoon,
      night), each corresponding to a specific time range.
- [ ] The app should determine the current shift based on the operator's local
      time or a predefined schedule.
- [ ] Only the timeline data relevant to the operator's current shift should be
      displayed, providing a focused view of their work period.

6. Shift Selection:

- [ ] The app should provide an option for the operator to manually select their
      shift if needed.
- [ ] In cases where the operator needs to review data from a different shift,
      they can choose the desired shift from a dropdown or a similar interface.
- [ ] Upon selecting a different shift, the app should update the displayed
      timeline data accordingly.

7. Shift Filter:

- • The app should include a filter option to allow the operator to filter the
  timeline data based on specific criteria within their shift.
- • For example, the operator may want to view only downtime events, production
  rates, or fault justifications within their shift.
- • The shift filter should provide flexibility for the operator to customize
  their view and focus on relevant data.
