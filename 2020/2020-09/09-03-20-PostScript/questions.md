# Questions

## Describe your production experience with React

The production experience I am most proud of is launching an AI-driven diagnostic application into hospitals across the Mid-West. There were a lot of hurdles around making HIPAA compliant software that integrated with Hospital Systems. I was the only one that worked fulltime on the Electron/React frontend, and we released a solid MVP with strong best practices. Since our initial release, I have completely rebranded the product, designed and added a dark theme, and integrated with Segment/Mixpanel for Product Analytics.

## If you have a component that relies on data from an API, how would you handle requesting the data and populating state

useEffect to call the api onComponentDidMount

useState to store the different states based on the requests

conditionally render based on the states derived from our request

```js
const Script = () => {
  const { scriptApi } = useServices();
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    scriptApi
      .getThatScript()
      .then((response) => {
        if (typeof response.data === "string") {
          return setScript(response.data);
        }
        setError("Backend received unexpected result");
      })
      .catch(() => {
        setError("Backend seems to be down");
      });
  }, []);

  if (isLoading) {
    return <p className="script script-loading">loading..</p>;
  }
  if (error) {
    return <p className="script script-error">{error}</p>;
  }

  return <p className="script">{script}</p>;
};
```

## How have you managed global application state previously and what were its advantages

I have used Context to manage things like configuration, color theme, internationalization, and the service layer.

Pros:

- native API -> no bundle increase
- really easy once you know what you are doing with hooks
- in my case there were a lot of c# devs so it was intuitive for them coming from a domain of dependency injection

Cons:

- perf hits/extra rerenders (I haven't encountered them, but the docs warn about this a lot)

I have used Redux before to handle many of the things included above

Pros:

- normalizing data options for highly nested data
- higher performance and more ways to optimize on data that changes frequently

Cons:

- foreign to non-react devs
- lots options/weeds to get caught up in (redux-saga or redux-thunk, or o wait what about rxjs)
- high overhead line count

## What's been a recent project you worked on that you were proud of? How did you contribute to the project and why are you proud of it

I took the following quote from my resume (remember devs are supposed to be lazy :))

"In the past 8 months, I created a living mock that disrupted a 3-year-old production app, took that mock to production in Hospitals across the MidWest, and got reviews from our CS department like “This is going to make the MAs’ jobs so much more efficient and impact so many patients living with diabetes! Kudos!”"

This is the first AI-driven diagnostic product (it can diagnose Diabetic Retinopathy w/o a doctor) to be approved by the FDA. I brought accessibility and delight to it.

I was the main or only contributor in image snapshot testing, end to end testing, dark mode, interactive animations, and product analytics.

## What are you most excited about with this role

Empathy and transparency are the driving forces in my job search and kindred values of ours. I also love working on emerging products, and PostScript and the field itself are just that
