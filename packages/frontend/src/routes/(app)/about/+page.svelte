<script>
import P from '$components/defaults/P.svelte'
import PageHeader from '$components/PageHeader.svelte'
import { CardLink, CodeOfEthics } from '$lib'
</script>

<div class="m-2 p-2">
  <span class="font-serif tracking-tight italic select-none sm:text-xl">A question...</span>
  <PageHeader>Who are we?</PageHeader>
  <div class="center mb-4 w-fit p-4">
    <div class="mb-16 flex w-fit max-w-2xl flex-col">
      <P>
        Founded in 2014, On Magnolia Square, or OMS, is a student journalism organization
        maintaining an active archive and fully-online living record of student life at NYU
        Shanghai. <em class="font-serif font-bold">We keep time.</em>
        Learn about
        <a class="text-nyu-purple-100 underline" href="/about/staff">our staff</a>
        .
      </P>
    </div>
    <div>
      <section>
        <h2 class="mb-8 font-display text-2xl font-semibold tracking-normal sm:text-3xl">
          ✑ Mission Statement
        </h2>
        <div class="">
          <span class="font-display font-stretch-condensed">
            <P
              class="mb-8 max-w-7xl text-4xl leading-10 tracking-normal sm:text-5xl sm:leading-12 lg:text-6xl lg:leading-18">
              On Magnolia Square produces truthful, balanced, timely, and engaging news and
              information to better serve the community at <a
                href="https://shanghai.nyu.edu"
                class="text-nyu-purple-100 hover:underline">
                NYU Shanghai
              </a>
              .
            </P>
          </span>
        </div>
      </section>
    </div>
  </div>
  <CodeOfEthics />
  <div class="center w-full">
    <ul class="align-center m-4 flex flex-wrap items-start space-x-4">
      <li>
        <CardLink title="Staff" link="/about/staff">Learn more about our staff</CardLink>
      </li>
      <!-- <li>
				<CardLink title="Transition" link="/about/transition" bgColor="green"
					>Learn more about our transition from OCA to OMS</CardLink
				>
			</li> -->
    </ul>
    <P class="p-2 text-sm leading-normal tracking-wider">
      Did you know our web code—for both this site and our content management system—is open source?
      Check it out <a
        href="https://github.com/onmagnoliasquare/website"
        class="text-nyu-purple-100 hover:underline">
        here on GitHub!
      </a>
      Project documentation and CI/CD is also there too.
    </P>
  </div>
</div>
