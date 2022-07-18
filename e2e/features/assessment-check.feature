Feature: Check the Star Wars application

    Background: Open the application
            Given The app is open on "localhost"
  
    Scenario Outline: Open the browser and check for Planet <planet-name>
        When I click on "Planets" radio button
        When I enter "<planet-name>" in text box and click on search button
        And I check the "Title" as "<planet-name>"
        Then I check the "Population" as "<population>"
        And I check the "Climate" as "<climate>"
        And I check the "Gravity" as "<gravity>"

        Examples:
            | planet-name | population    | climate   | gravity     |
            | Tatooine    | 200000        | arid      | 1 standard  |
            | Hoth        | unknown       | frozen    | 1.1 standard|
            | Coruscant   | 1000000000000 | temperate | 1 standard  |

    Scenario Outline: check for People <name>
        Given I click on "People" radio button
        When I enter "<name>" in text box and click on search button
        Then I check the "Name" as "<name>"
        And I check the "Gender" as "<gender>"
        And I check the "Birth-year" as "<BY>"
        And I check the "Eye-color" as "<EC>"
        And I check the "Skin-color" as "<SC>"

         Examples:
            | name             | gender   | BY      | EC     | SC    |
            | Darth Vader      | male     | 41.9BBY | yellow | white |
            |Biggs Darklighter | male     | 24BBY   | brown  | light |

    Scenario Outline: check data count displayed as a search result for <searchFor> with name <name>
        Given I click on "<searchFor>" radio button
        When I enter "<name>" in text box and click on search button
        Then the total results fetched should be "<count>"

        Examples:
        | searchFor | name  | count |
        | People    | a     | 10    |
        | People    | Ti    | 7     |
        | Planets   | mi    | 6     |
        | Planets   | E     | 10    |

    Scenario Outline: check for invalid <searchFor>
        When I click on "<searchFor>" radio button
        When I enter "<name>" in text box and click on search button
        Then No Result is displayed
        
        Examples:
        | searchFor | name   |
        | People    | qw     |
        | Planet    | qw     |
