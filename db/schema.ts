import {
	bigint,
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core'

const commonFields = {
	id: uuid('id').primaryKey().defaultRandom(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}

export const user = pgTable('user', {
	...commonFields,
	name: text('name').notNull(),
	email: text('email').notNull(),
	emailVerified: boolean('emailVerified').notNull(),
	image: text('image'),
	role: text('role'),
	banned: boolean('banned'),
	banReason: text('banReason'),
	banExpires: bigint({ mode: 'number' }),
})

export const session = pgTable('session', {
	...commonFields,
	userId: uuid('userId')
		.notNull()
		.references(() => user.id),
	token: text('token').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	impersonatedBy: text('impersonatedBy'),
	activeOrganizationId: text('activeOrganizationId'),
})

export const account = pgTable('account', {
	...commonFields,
	userId: uuid('userId')
		.notNull()
		.references(() => user.id),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
	refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
	scope: text('scope'),
	idToken: text('idToken'),
	password: text('password'),
})

export const verification = pgTable('verification', {
	...commonFields,
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
})

export const organization = pgTable('organization', {
	...commonFields,
	name: text('name').notNull(),
	slug: text('slug').notNull(),
	logo: text('logo'),
	metadata: text('metadata'),
})

export const member = pgTable('member', {
	...commonFields,
	userId: uuid('userId')
		.notNull()
		.references(() => user.id),
	organizationId: uuid('organizationId')
		.notNull()
		.references(() => organization.id),
	role: text('role'),
})

export const invitation = pgTable('invitation', {
	...commonFields,
	organizationId: uuid('organizationId')
		.notNull()
		.references(() => organization.id),
	inviterId: uuid('inviterId')
		.notNull()
		.references(() => user.id),
	email: text('email').notNull(),
	role: text('role').notNull(),
	status: text('status').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
})

export const jwks = pgTable('jwks', {
	...commonFields,
	publicKey: text('publicKey').notNull(),
	privateKey: text('privateKey').notNull(),
})
