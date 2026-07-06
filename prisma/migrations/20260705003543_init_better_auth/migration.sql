-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "idToken" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EggGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EggGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "nationalDexId" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "specialAttack" INTEGER NOT NULL,
    "specialDefense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "generationId" TEXT NOT NULL,
    "evWorth" TEXT,
    "gender" TEXT,
    "evolve" TEXT,
    "catchRate" INTEGER,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonEggGroup" (
    "pokemonId" TEXT NOT NULL,
    "eggGroupId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PokemonType" (
    "pokemonId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PokemonAbility" (
    "pokemonId" TEXT NOT NULL,
    "abilityId" TEXT NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "name" INTEGER NOT NULL,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "boxartUrl" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonGame" (
    "pokemonId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" TEXT NOT NULL,
    "seed" TEXT NOT NULL,
    "categoryIndex" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON "Account"("providerId", "accountId");

-- CreateIndex
CREATE INDEX "Verification_identifier_idx" ON "Verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE INDEX "Type_generationId_idx" ON "Type"("generationId");

-- CreateIndex
CREATE UNIQUE INDEX "Ability_name_key" ON "Ability"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EggGroup_name_key" ON "EggGroup"("name");

-- CreateIndex
CREATE INDEX "Pokemon_nationalDexId_idx" ON "Pokemon"("nationalDexId");

-- CreateIndex
CREATE INDEX "Pokemon_generationId_idx" ON "Pokemon"("generationId");

-- CreateIndex
CREATE INDEX "Pokemon_hp_idx" ON "Pokemon"("hp");

-- CreateIndex
CREATE INDEX "Pokemon_attack_idx" ON "Pokemon"("attack");

-- CreateIndex
CREATE INDEX "Pokemon_defense_idx" ON "Pokemon"("defense");

-- CreateIndex
CREATE INDEX "Pokemon_specialAttack_idx" ON "Pokemon"("specialAttack");

-- CreateIndex
CREATE INDEX "Pokemon_specialDefense_idx" ON "Pokemon"("specialDefense");

-- CreateIndex
CREATE INDEX "Pokemon_speed_idx" ON "Pokemon"("speed");

-- CreateIndex
CREATE INDEX "PokemonEggGroup_pokemonId_idx" ON "PokemonEggGroup"("pokemonId");

-- CreateIndex
CREATE INDEX "PokemonEggGroup_eggGroupId_idx" ON "PokemonEggGroup"("eggGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonEggGroup_pokemonId_eggGroupId_key" ON "PokemonEggGroup"("pokemonId", "eggGroupId");

-- CreateIndex
CREATE INDEX "PokemonType_pokemonId_idx" ON "PokemonType"("pokemonId");

-- CreateIndex
CREATE INDEX "PokemonType_typeId_idx" ON "PokemonType"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonType_pokemonId_typeId_key" ON "PokemonType"("pokemonId", "typeId");

-- CreateIndex
CREATE INDEX "PokemonAbility_pokemonId_idx" ON "PokemonAbility"("pokemonId");

-- CreateIndex
CREATE INDEX "PokemonAbility_abilityId_idx" ON "PokemonAbility"("abilityId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonAbility_pokemonId_abilityId_key" ON "PokemonAbility"("pokemonId", "abilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Generation_name_key" ON "Generation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE INDEX "Game_generationId_idx" ON "Game"("generationId");

-- CreateIndex
CREATE INDEX "Game_name_idx" ON "Game"("name");

-- CreateIndex
CREATE INDEX "PokemonGame_pokemonId_idx" ON "PokemonGame"("pokemonId");

-- CreateIndex
CREATE INDEX "PokemonGame_gameId_idx" ON "PokemonGame"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonGame_pokemonId_gameId_key" ON "PokemonGame"("pokemonId", "gameId");

-- CreateIndex
CREATE INDEX "UserAnswer_userId_seed_idx" ON "UserAnswer"("userId", "seed");

-- CreateIndex
CREATE INDEX "UserAnswer_pokemonId_idx" ON "UserAnswer"("pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_seed_userId_categoryIndex_key" ON "UserAnswer"("seed", "userId", "categoryIndex");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonEggGroup" ADD CONSTRAINT "PokemonEggGroup_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonEggGroup" ADD CONSTRAINT "PokemonEggGroup_eggGroupId_fkey" FOREIGN KEY ("eggGroupId") REFERENCES "EggGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonType" ADD CONSTRAINT "PokemonType_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonType" ADD CONSTRAINT "PokemonType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonAbility" ADD CONSTRAINT "PokemonAbility_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonAbility" ADD CONSTRAINT "PokemonAbility_abilityId_fkey" FOREIGN KEY ("abilityId") REFERENCES "Ability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonGame" ADD CONSTRAINT "PokemonGame_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonGame" ADD CONSTRAINT "PokemonGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
