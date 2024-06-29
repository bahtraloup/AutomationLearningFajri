Feature: Flight Search
  As a user
  I want to search for flights
  So that I can choose a flight to book

  Scenario Outline: Search for flights and choose one
    Given I am on the BlazeDemo homepage
    When I select the departure city "<departureCity>"
    And I select the destination city "<destinationCity>"
    And I click the "Find Flights" button
    # Then I should see flight search results
    # And I should see flights from "<departureCity>" to "<destinationCity>"
    When I choose a flight
    Then I should be on the flight confirmation page

    Examples:
      | departureCity | destinationCity |
      | Boston        | Rome           |
      | Paris         | London         |
      | New York      | Madrid         |