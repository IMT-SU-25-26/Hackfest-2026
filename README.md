## Steps to install
1. `git clone https://github.com/IMT-SU-25-26/Hackfest-2026.git`
2. start dbngin
3. buat file .env (utk saat ini perlu DATABASE_URL aja)
4. `pnpm prisma generate`
5. `pnpm prisma migrate dev`
6. `pnpm i`
7. `pnpm dev`

## Homepage Structure 
1. File utama adalah src/app/page.tsx
2. File utama menggunakan 5 component yaitu HeroSection, AboutSection, RecapSection, TimelineSection, FaqSection
3. Kelima file components itu ada di src/components/homepage/[namaSection].tsx
4. Editlah file component nya

## LoginPage Structure
1. File page login adalah src/app/(auth)/login/page.tsx
2. Langsung edit di file tersebut

