# StickyNotes
This is a personal project to teach myself how to use popular libraries. I was stuck in tutorial hell and decided to finally jump in with something simple. Users can login and visit their dashboard where they can manage personal notes. Made with Next.js, NextAuth, Prisma, Bun, TRPC, and Tailwind (also coded in Zed). The database is hosted on Planetscale and will be migrated soon since they are retiring the hobby plan. I learned many lessons throughout this project and will detail them in the following sections. Feel free to checkout the project [`here`](https://sticky-notes-northhess.vercel.app) and let me know what you think! (I will gladly listen to advice on how to improve)

## Next.js
Using Next allowed me to produce a functional frontend/backend combo extremely quickly. Unfortunately, I also feel like it has abstracted much of their interactions away. This makes me want to take the time in future projects to move away from Next so that I can gain an appreciation and understanding of the interactions between front and backend.

## TRPC
In a similar vein, TRPC was extremely helpful in implementing a basic backend api in order to query my DB. However, I also want to take the time in the future to build my own the hard way so that I can understand the innerworkings better. I did also have issues manipulating the context of TRPC. I was trying to pass my DB client in the context so that I could access them by default within each procedure. This may partially be due to the still semi-recent changes of the Next app router and the transition from NextAuth to Auth. TRPC is certainly great at what it does, but I want to learn more and create my own REST api in the future.

## Prisma (w/ Planetscale)
Setting up a DB in college was certainly a bit of a hassle, especially when I had little experience and wanted to get to building the application. Prisma and Planetscale made this experience much easier. I have no admin needed and can define my schemas on the fly. This made changing any schemas much easier. I would like to play around with DB branches more in the future though as I did not take the opportunity to really use them in this project.

## NextAuth
I had trouble when it came to authentication. I liked the options that NextAuth provided, but trying to manipulate the context of a session was a hassle. I wanted to be able to pass the user id within the session instead of only the user email, image, and name. I believe that the reason I could not pass the user id in the session was because I went with database sessions (largely due to the handiness of the PrismaAdapter). As such I simply made do without this, but going forward it would be nice to pass the user id in the session in order to reduce queries to the DB. This would likely require moving away from database sessions though, which would also likely reduce overall queries to the database.

## Tailwind
Tailwind was great. I learned CSS in college so I know the basics, but Tailwind made crafting a UI so much simpler. The utility classes were great, sure, but also their documentation made everything so much simpler. Even if I do not or can not use Tailwind in the future, I will certainly reference their docs for any styling I need because of how understandable they are in comparison to CSS documentation.

## Bun
I do not really have any experience with Node.js so I do not have much to compare Bun to. However, Bun seemed to work as expected. I will continue to use Bun moving forward unless I hit an issue that Bun cannot resolve.

## Zed
Great code editor. Not as many features as VSCode and I wish it had colored file icons. Other than that though it works great. I will stick with it going forward as I appreciate the more minimal feel (I am sure I could get the same from VSCode but I also just enjoy the idea of using something different).


## Closing Thoughts
Overall I had a great time crafting this project. It certainly is not perfect and I am sure that there are many things that could be improved. Honestly though, I am just proud of the fact that I finally built my own thing. I started from a barebones Next app and simply added libraries as I needed more functionality. I added them by reading through their docs and consulting stack overflow and other repos as I hit issues. Basically what I am saying is, I am glad that I built something from scratch without following a tutorial and I am excited to build and learn more going forward.
