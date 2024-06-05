import {
	copyAndProcessDir,
	getDestinationPath,
	movePlugin,
	replaceTextPlugin
} from '../../helper.js';
import path from 'path';

function genD2ldevReleaseTargetMessage(subdomain) {
	return ` to [${subdomain}.d2l.dev](https://${subdomain}.d2l.dev/)`;
}

function genS3PublishTemplate(roleToAssume, awsRegion, bucketPath) {
	// NOTE: Indentation levels in yml files are important and the publish.yml file uses 2 spaces.
	return `
      - name: Assume role
        if: github.ref == 'refs/heads/main'
        uses: Brightspace/third-party-actions@aws-actions/configure-aws-credentials
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-session-token: \${{ secrets.AWS_SESSION_TOKEN }}
          role-to-assume: ${roleToAssume}
          role-duration-seconds: 3600
          aws-region: ${awsRegion}

      - name: Publish
        uses: BrightspaceUI/actions/publish-to-s3@main
        with:
          bucket-path: ${bucketPath}
          publish-directory: ./dist/
`;
}

export function run(templateData) {
	const {
		hyphenatedName,
		hostingTarget,
		roleToAssume,
		awsRegion,
		bucketPath,
		d2ldevSubdomain
	} = templateData;

	const templateRoot = path.join(__dirname, 'templates');
	const destinationRoot = getDestinationPath(hyphenatedName);

	const releaseTargetMessage = d2ldevSubdomain
		? genD2ldevReleaseTargetMessage(d2ldevSubdomain)
		: '';
	const publishStep = hostingTarget === 'other'
		? ''
		: genS3PublishTemplate(roleToAssume, awsRegion, bucketPath);
	const elementFile = `${hyphenatedName}.js`;

	copyAndProcessDir(templateRoot, destinationRoot, [
		movePlugin({
			'_package.json': 'package.json',
			'_gitignore': '.gitignore',
			'_browserslistrc': '.browserslistrc',
			'_CODEOWNERS': 'CODEOWNERS',
			'_README.md': 'README.md',
			'src/components/_element.js': `src/components/${elementFile}`
		}),
		replaceTextPlugin({
			'_package.json': templateData,
			'_CODEOWNERS': templateData,
			'_README.md': {
				...templateData,
				releaseTargetMessage
			},
			'.github/workflows/publish.yml': {
				...templateData,
				publishStep
			},
			'src/index.html': templateData,
			'src/index.js': {
				...templateData,
				elementFile
			},
			'src/components/_element.js': templateData,
		})
	]);
}
